---
draft: false
date: 1994-07-07T18:06:31+01:00
title: "DYCP and music routine on a 386 PC"
tags: ["coding","music"]
---

Coming from the Commodore 64 and being used to coding in assembler, I tried to
do the same on my dad's 386 PC. I decided on a
[DYCP](http://www.antimon.org/dl/c64/code/dycp.txt) effect, a popular effect in
the Commodore 64 demoscene.

The DYCP itself (the bouncy scroller) wasn't too hard; most effort and fun went
into the music routine for the
[Soundblaster](https://en.wikipedia.org/wiki/Sound_Blaster)'s [OPL2 (Yamaha
YM3812)](https://en.wikipedia.org/wiki/Yamaha_YM3812) chip. This is the chip on
the Soundblaster that was has a little [FM
synthesizer](https://en.wikipedia.org/wiki/Frequency_modulation_synthesis) in
it.

Getting sound out of it involved sending the right number to the various
registers of the chip (for pitch, ADSR, operators and modulator and such).  This
was all in assembler; "composing" the music involved creating different table of
numbers to be sent in sequence to the chip, using the music routines I knew from
my Commodore 64 heroes as inspiration.

{{< youtube id="QhkoBqRHDYQ" autoplay="true" >}}

## Main code for the DYCP

```asm
;DEBUG equ

.MODEL TINY
.286
LOCALS

INCLUDE HLib.INC ; HeatWave Adlib Player header

IFDEF DEBUG
    Mark MACRO color
             mov  ah,color
             call Border
         ENDM
ELSE
    Mark MACRO
         ENDM
ENDIF

.CODE
ORG 100h

Start: ;call Check286 ; check for 286 or higher and VGA present
       ;jne  @@a286
       ;mov  ah,9
       ;mov  dx,OFFSET no286
       ;int  21h
       ;int  20h
@@a286: call CheckVideo
       jne  @@aVGA
       mov  ah,9
       mov  dx,OFFSET noVideo
       int  21h
       int  20h
                 
@@aVGA: mov  ax,11h ; Set 640x480x2 mode
       int  10h
       mov  ax,1130h ; Get 8x8 font address
       mov  bh,6
       int  10h
       mov  word ptr [Font],bp
       mov  word ptr [Font+2],es
       mov  ax,word ptr [Font] ; Clear Text-buffer
       push ds                  
       pop  es  
       mov  cx,80
       mov  di,OFFSET Text
       rep  stosw  
       mov  ax,OFFSET dycpmus
       push ax   
       call HAP_Init ; Init HeatWave Adlib Player
       pop  ax 
       
       mov  dx,03d4h ; write-unprotect some CRT-regs
       mov  al,11h
       out  dx,al
       inc  dx
       in   al,dx
       and  al,01111111b
       out  dx,al
       
       dec  dx
       mov  ax,2003h ; End Horizontal Blanking/Skew=001b
       out  dx,ax
       mov  ax,4d01h ; Horizontal Displayed=77 characters
       out  dx,ax
       
IFDEF DEBUG
         mov  dx,03c0h ; Set border color to 1
         mov  al,11h
         out  dx,al
         mov  al,1
         out  dx,al
ENDIF
        
DemoLoop: cli
          call WaitSync  ; wait for vertical sync-pulse
          Mark 20
          call dycp      ; draw the dycp
          Mark 40
          call Scroll
          call HAP_Play ; update music
          Mark 0 
          call Key       ; check for keypress 
          jmp  DemoLoop     

IFDEF DEBUG

Border : mov  dx,03c8h
         mov  al,1
         out  dx,al
         mov  al,ah
         inc  dx
         out  dx,al
         shl  al,1
         out  dx,al
         shr  al,2
         out  dx,al
         ret
ENDIF
          
dycp:     mov  ax,0a000h ; es -> screen segment
          mov  es,ax 
          xor  bx,bx
@@b: 
          mov  di,[dycpsin][bx]    ; get screen loc for char
          mov  si,[Text][bx]       ; get char offset
          push ds
          mov  ax,word ptr [Font+2] 
          mov  ds,ax
          mov  cx,15
@@a:      movsb
          add  di,79
          loop @@a
          pop  ds
          add  bx,2
          cmp  bx,160
          jne  @@b
          ret

WaitSync: mov dx,03dah
@@a:      in  al,dx
          test al,8
          jne   @@a
@@b:      in   al,dx
          test al,8
          je  @@b 
          ret

Scroll: 
        push ds   ; Shift Text buffer
        pop  es
        mov  di,OFFSET Text
        mov  bx,[di]
        mov  si,di
        add  si,2
        mov  cx,79
        rep  movsw
        mov  [di],bx

        mov  dx,03c0h     ; Update 'D016'
        mov  al,13h OR 32
        out  dx,al
        mov  al,[D016]
        out  dx,al
        or   al,al        ; D016=0 -> do not roughscroll
        jne  @@RoughScroll
        
@@get_char:         
            mov  bx,[textpoint] ; Get a new character
            inc  [textpoint]
            mov  al,byte ptr [dycptxt][bx]
            cmp  al,0dh
            je   @@get_char
            cmp  al,0ah
            je   @@get_char    
            cmp  al,'@'
            jne  @@no_end
            mov  [textpoint],0
            jmp  @@get_char

@@no_end: mov  bl,[Rough]
          xor  bh,bh
          shl  bl,1
          xor  ah,ah
          shl  ax,4
          add  ax,word ptr [Font]
          mov  [Text][bx],ax
          jmp  @@go_on   

@@RoughScroll:      
        dec  [Rough]
        jge  @@sip
        mov  [Rough],79 
@@sip:  mov  dx,03d4h
        mov  al,13
        mov  ah,[Rough]
        out  dx,ax
@@go_on: 
        inc [D016]
        inc [D016]
        and [D016],7
        ret

Key:   mov  ah,1
       int  16h
       je   @@nokey
       xor  ah,ah
       int  16h
       mov  ax,3
       int  10h
       mov  ah,9
       mov  dx,OFFSET credits
       int  21h
       int  20h
@@nokey: ret                 

.DATA
no286 db 0ah,0dh,'You need a 286 or higher to run this...',0ah,0dh,'$'
noVideo db 0ah,0dh,'You need VGA or MCGA to see this...',0ah,0dh,'$'

Font dd ?

EXTRN dycpsin, dycptxt, dycpmus

color db 0
textpoint dw 0
D016 db 0
Rough db 79

credits db 'When  : ',??DATE,', ',??TIME,0ah,0dh
        db 'Code  : Mad B/HTW',0ah,0dh
        db 'Grafix: IBM',0ah,0dh
        db 'Muzak : Rhyme Design/HTW',0ah,0dh,'$'

Text dw 80 DUP(' '*16)

END Start
```

## Adlib music player

```asm
; ADLIB music-player v0.01 (c) 1994 by Mad B/Rhyme Design/HeatWave
;------------------------------------------------------------------------
; Plays HAM (HeatWave Adlib Module) files.
; Call HAP_Init to initialize player.
; Call HAP_Play to update music.
; Background playing: call PlayHAM to start background playing
;                     call StopHAM to stop  "                "
;
; THIS VERSION USES INT08 FOR BACKGROUND PLAYING (Very unwise!!!)
; Still to implement:
; [-Transpose doesn't work correctly due to 12 notes/16 bits] FIXED 8/3/94
; -Repeat block function in track ($c0+x)
; -Drums are shitty
; [-Separate drumtrack (6) where notes are interpreted as drums] DONE 8/3/94
; -Interrupt play using ADLIB timer 
; -Multiple songs in one, caller provides pointer to InitPlayer 
; -Sound-setting for Drums

.MODEL TINY,C

PUBLIC HAP_Init,HAP_Play,PlayHAM,StopHAM,HAPvers

ADLIB_ADDR equ 0388h

.DATA
EXTRN Track0,Track1,Track2,Track3,Track4,Track5,DrumTrack
EXTRN BlockAdr,Sound0,SongName,tempo:BYTE

HAPvers db 'HeatWave Adlib Player version ',??DATE,'$'

operator db 0,1,2,8,9,0ah,10h,11h,12h ; base address for operator 1
                                      ; operator 2 = 3 + operator 1

notehi db 1,1,1,1,1,1,2,2,2,2,2,2
notelo db 6bh,81h,98h,0b0h,0cah,0e5h,02h,20h,41h,63h,87h,0aeh

trackp db ?,?,?,?,?,?,?  ; where are we in track
blockp db ?,?,?,?,?,?,?  ; where are we in block
songdelay  db ?              ; delay counter for whole song
counter db ?,?,?,?,?,?,?

curblock db ?,?,?,?,?,?,? ; which block currently playing
transpose db ?,?,?,?,?,?,? ; current transpose for each track

delay db 4,4,4,4,4,4,4

trackadr dw OFFSET Track0,OFFSET Track1,OFFSET Track2
         dw OFFSET Track3,OFFSET Track4,OFFSET Track5
         dw OFFSET DrumTrack

.CODE
LOCALS

HAP_Init PROC

           mov  ax,0100h   ; just poke zero to all (1..f5) registers...
           mov  cx,0f5h
@@a:       call poke
           inc  ah
           loop  @@a
           mov  ax,0120h   ; enable waveform-modulation
           call poke
           xor  si,si
@@next:    mov  [trackp][si],0  ; reset some variables
           mov  [counter][si],1
           mov  [transpose][si],0
           call GetBlock
           inc  si
           cmp  si,7
           jb   @@next
           mov  si,6       ; Set the sound for voice 6,7 & 8 (drums)
           mov  al,5
           call SetSound
           inc  si
           mov  al,5
           call SetSound
           inc  si
           mov  al,5
           call SetSound
           mov  al,[tempo]
           mov  [songdelay],al
           ret

HAP_Init ENDP

PlayHAM    PROC

           call HAP_Init           
           mov  ax,3508h   ; Hook up Play-routine to timer interrupt
           int  21h
           mov  word ptr cs:[OldInt8],bx
           mov  word ptr cs:[OldInt8+2],es
           mov  ax,2508h
           mov  dx,OFFSET NewInt8
           int  21h
           ret

PlayHAM ENDP

StopHAM PROC
        push ds
        mov  dx,word ptr [OldInt8]    ; Disconnect our routine from timer
        mov  ax,word ptr [OldInt8+2]
        mov  ds,ax
        mov  ax,2508h
        int  21h
        pop  ds
        ret

StopHAM ENDP

NewINT8: pushf
         call dword ptr cs:[OldINT8]
         push ax bx cx dx si di ds es
         pushf
         push cs
         push cs
         pop  es
         pop  ds
         call HAP_Play
         popf
         pop  es ds di si dx cx bx ax
         iret
         
OldINT8: dd ?        


poke: push ax cx
      mov  dx,ADLIB_ADDR  ;*** Writes AL to Adlib-register AH
      xchg ah,al      ;al and dx are destroyed
      out  dx,al
      in   al,dx        ; Wait
      in   al,dx
      in   al,dx  
      in   al,dx
      in   al,dx
      in   al,dx
      inc  dx
      mov  al,ah
      out  dx,al       ; Wait
      dec  dx
      mov  cx,10 ;35
@@b:  in   al,dx
      loop @@b
      pop  cx ax
      ret

HAP_Play PROC
     
     dec [songdelay]
     je  @@go_on   
     jmp @@exit
     
@@go_on: mov al,[tempo]
     mov [songdelay],al

     xor  si,si           ; si=voice
@@a: dec  [counter][si]
     jne  @@next

     call GetNote

     cmp  si,6         ; For track 6, play the drums
     jne  @@b
     or   al,11100000b
     mov  bl,al
     mov  ah,0bdh
     mov  al,11100000b
     call poke
     mov  al,bl
     call poke
     jmp  @@c

@@b:                   ; Else play a note
     mov  ah,al                ; Transpose note
     and  ah,0fh
     mov  bh,[transpose][si]
     and  bh,0fh
     add  ah,bh
     cmp  ah,0bh
     jbe  @@d  
     add  al,4
@@d: add  al,[transpose][si]
     mov  bx,si                ; Play note
     call StartNote
@@c:
     mov  al,[delay][si]
     mov  [counter][si],al

@@next: inc  si
        cmp  si,7
        jb   @@a

@@exit: ret

HAP_Play ENDP

GetBlock: mov  bx,si
          shl  bx,1
          mov  bx,[trackadr][bx]

          mov  al,[trackp][si]
          inc  [trackp][si]
          xor  ah,ah
          add  bx,ax
          mov  al,[bx]            ; get block-index
          cmp  al,0ffh
          jne  @@a
          mov  [trackp][si],0
          jmp  GetBlock

@@a:      cmp  al,80h
          jb   @@b
          sub  al,80h
          mov  [transpose][si],al
          jmp  GetBlock    
@@b:      mov  [curblock][si],al
          mov  [blockp][si],0
          ret

GetNote:  xor  bh,bh
          mov  bl,[curblock][si]
          shl  bx,1
          mov  bx,[blockadr][bx]
          mov  al,[blockp][si]
          xor  ah,ah
          add  bx,ax
          mov  al,[bx]
          inc  [blockp][si]
          cmp  al,0ffh
          jne  @@a
          call GetBlock
          jmp  GetNote

@@a:      cmp  al,0f0h
          ja   @@c

          mov  ah,al
          and  ah,11000000b
          cmp  ah,080h
          jne  @@b


          sub  al,80h
          mov  [delay][si],al
          jmp  GetNote

@@b:      cmp  ah,0c0h
          jne  @@c
          sub  al,0c0h
          call SetSound
          jmp  GetNote

@@c:      ret

StartNote:
                         ; al=oct:note, bl=voice
          mov  bh,al
          shr  bh,1
          shr  bh,1
          mov  di,ax
          and  di,0fh
          and  bh,11100b
          or   bh,[notehi][di]
          or   bh,100000b      ; bh=key on:octave:hifreq

          mov  al,[notelo][di]
          mov  ah,0a0h
          add  ah,bl           ; bl=voice
          call poke
          add  ah,10h
          mov  al,0
          call poke
          mov  al,bh
          call poke
          xor bh,bh
          ret

PokeWord:  lodsb         
           call poke
           add  ah,3
           lodsb
           call poke
           add  ah,20h-3
           ret

SetSound: ; si=voice al=sound num
          ; kills ax, bx, cx, dx, di

              xor  ah,ah  ; sound=sound*16
              shl  ax,1
              shl  ax,1
              shl  ax,1
              shl  ax,1
              add  ax,OFFSET Sound0
              mov  di,ax

              mov  ax,si
              mov  ah,20h ; set multiple (base-reg 20h and 23h)

              mov bx,OFFSET operator ; 'Adds' voice AL to base-address AH
              xlat
              add ah,al

              xchg si,di 
              call PokeWord
              call PokeWord ; set level (base-reg 40h and 43h)
              call PokeWord ; set attack/decay (base-reg 60h and 63h)
              call PokeWord ; set sustain/release (base-reg 80h and 83h)
              add  ah,40h   ; set waveform (base-reg e0h and e3h)
              call PokeWord
              mov  ax,di
              mov  ah,al
              add  ah,0c0h ; set feedback/algorithm (base-reg c0h)
              lodsb
              call poke

              mov  si,di
              ret
END
```

## Data making up the song


```asm
.MODEL TINY

PUBLIC dycpmus

.DATA

dycpmus=$

songname db '1234567890123456'
         db 0
vers     dw 0100
tempo    db 3

soundadr dw OFFSET Sound0

trackadr dw OFFSET Track0,OFFSET Track1,OFFSET Track2
         dw OFFSET Track3,OFFSET Track4,OFFSET Track5
         dw OFFSET DrumTrack

blockadr dw OFFSET Block0,OFFSET Block1,OFFSET Block2
         dw OFFSET Block3,OFFSET Block4,OFFSET Block5
         dw OFFSET Block6,OFFSET Block7,OFFSET Block8
         dw OFFSET Block9,OFFSET Block0a,OFFSET Block0b

Sound0 dw 0000h,1f1fh,0000h,0000h,0000h
       db 0h,0,0,0,0,0
Sound1 dw 4141h,000fh,0e6d5h,08888h,0101h ; Bass
       db 0010b,0,0,0,0,0
Sound2 dw 04101h,040eh,0e464h,06666h,0202h ; Solo 
       db 1011b,0,0,0,0,0
Sound3 dw 04101h,0914h,0e462h,06666h,0202h ; Solo echo
       db 1011b,0,0,0,0,0
Sound4 dw 0101h,0b14h,0e6f5h,04f4fh,0203h ; Chords
       db 1100b,0,0,0,0,0
Sound5 dw 0909h,0400h,0faf9h,0ffffh,0203h ; DrumSound
       db 0100b,0,0,0,0,0
Sound6 dw 0209h,0810h,0f676h,07777h,0201h ; Metal 
       db 0110b,0,0,0,0,0
Sound7 dw 0105h,0404h,0f7f7h,07878h,0201h ; Metal 
       db 1000b,0,0,0,0,0

;*** Tracks: 80h+x=transpose x notes 0FFh=End ***

Track0 db 90h,3,3,3,3,1,1,0ffh
Track1 db 90h,4,4,4,4,7,7,0ffh
Track2 db 90h,5,5,5,5,8,8,0ffh
Track3 db 90h,6,6,6,6,9,9,0ffh
Track4 db 90h,0,0,0ah,0ffh
Track5 db 90h,0,0ffh
DrumTrack db 80h,2,0ffh

;*** Blocks: 80h+x=duration x (x>0) 0C0h+x=sound x 0FFh=End ***

Block0 db 0a0h,0c0h,00h,00h,00h,00h,0ffh ; 'Empty' block

Block1 db 0c1h
       db 86h,0ah,82h,1ah,0c7h,84h,50h,0c1h,0ah
       db 86h,15h,82h,25h,0c7h,84h,50h,0c1h,15h
       db 86h,10h,82h,20h,0c7h,84h,50h,0c1h,10h
       db 86h,12h,82h,22h,0c7h,84h,50h,50h,0c1h        
       db 86h,0ah,82h,1ah,0c7h,84h,50h,0c1h,0ah
       db 86h,10h,82h,20h,0c7h,84h,50h,0c1h,10h
       db 86h,15h,82h,25h,0c7h,84h,50h,0c1h,15h
       db 86h,15h,82h,25h,0c7h,84h,50h,82h,50h,50h,0ffh        

Block2 db 84h,2,16,1,16,0ffh

Block3 db 0c1h
       db 86h,12h,82h,22h,0c7h,84h,50h,0c1h,15h
       db 86h,09h,82h,19h,0c7h,84h,50h,0c1h,15h
       db 86h,14h,82h,24h,0c7h,84h,50h,0c1h,17h
       db 86h,05h,82h,15h,0c7h,84h,50h,50h,0ffh 


Block4 db 0c0h,84h,0,0c4h,88h,29h,29h,29h,29h,27h,27h,25h,84h,25h,0ffh
Block5 db 0c0h,84h,0,0c4h,88h,32h,32h,30h,30h,2bh,2bh,29h,84h,29h,0ffh
Block6 db 0c0h,84h,0,0c4h,88h,35h,35h,34h,34h,34h,34h,30h,84h,30h,0ffh

Block7 db 0c0h,84h,0,0c4h,88h,2ah,2ah,29h,29h,27h,27h,29h,29h
       db 2ah,2ah,27h,27h,29h,29h,29h,84h,29h,0ffh 

Block8 db 0c0h,84h,0,0c4h,88h,32h,32h,30h,30h,30h,30h,32h,32h
       db 32h,32h,30h,30h,30h,30h,30h,84h,30h,0ffh        
Block9 db 0c0h,84h,0,0c4h,88h,35h,35h,35h,35h,34h,34h,35h,35h
       db 35h,35h,34h,34h,35h,35h,35h,84h,35h,0ffh

Block0a db 0c0h,88h,0,0c2h
        db 81h,38h,87h,39h,88h,37h,35h,81h,3bh,83h,40h,84h,42h,40h,94h,39h
        db 81h,44h,87h,45h,84h,44h,42h,88h,40h,84h,42h,81h,38h,0abh,39h
        db 81h,38h,87h,39h,88h,37h,35h,81h,3bh,83h,40h,84h,42h,40h,90h,39h
        db 81h,38h,83h,39h,84h,45h,44h,88h,42h,81h,43h,83h,44h,84h,45h,47h
        db 81h,44h,0a3h,45h,0ffh
Block0b db 0ffh

END
```


