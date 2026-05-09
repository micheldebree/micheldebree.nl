---
draft: false
date: 2023-11-11T00:00:00+02:00
title: "Sometimes the best code is no code"
tags: ["coding"]
---

I love writing code. I never get tired of it. It is what I am hired for, to help
my clients automate their processes. Often times though, a problem is better
solved by _not_ writing code, or even by deleting code.

Here is an example of how a lot of resources were saved by not implementing the
proposed solution and instead deleting a little a bit of code.

## The solution

In a big project I worked on, several applications built by different teams were
integrated into one portal application. The portal supplied things like a
unified header and footer, menu structure and authentication. I was on one of
the teams.

The integration was done using iframes. In general, using iframes for this sort
of thing is a bad thing because they cause usability and security headaches. So
the portal people initiated a rewrite where iframes would be ditched in favor of
something called 'ShadowDOM', which would allow us to merge separate web
applications into one iframe-less page. A task-force was set up by the portal
team, and one developer from each of the application teams, one of which was me.
The plan was to migrate the whole thing over a couple of sprints.

The portal team and one of the application teams had already done a
proof-of-concept to show that it could be done. It was decided that it could be
done, but that a few loose ends were left to figure out along the way. Because
of those loose ends, I prefered to plan this so that the proof-of-concept team
would be the first to finish the integration. If we all started at the same
time, we would be solving the same loose ends, and maybe in different ways. That
would be a waste.

For our team it didn't come to that though, because I started to wonder whether
this was the right solution. I agreed getting rid of the iframe integration was
a good idea. The whole thing was technically a very good idea and would make the
site more useable and secure.

## Why though?

What was nagging in the back of my mind though was the fact that the last time our
team had anything to do with the integration in the portal, was when we set it up
ages ago. We don't use it, we don't test it, we don't see it, and we don't
receive any feedback about it from users. So I had a look at our application in
the portal and soon found out that deep linking to a detail page in our
application didn't work in the portal version. When I found the cause it was
apparent that it had been broken for quite a while.

Why hasn't anybody complained about this? I asked a business liaison colleague
of mine who was more in touch with the users than me, and asked who actually
uses the thing. We couldn't say anybody did, and in fact the users were guided
towards the standalone version that was not integrated into the portal. Deep
linking worked fine there.

I then got together the architects that were responsible for positioning our
application in the bigger picture landscape. Does this app belong in the portal
or is standalone fine? We soon decided on the latter.

## The real solution

The work left for our application were trivial; the architects made a few
changes in documentation, the portal team threw away our integration
configuration, and I threw away a few lines of integration code from our
application. I stepped out of the task force and could work on actual problems.
This saved a lot of work in building, testing, bug fixing, attending meetings
and maintaining something that nobody actually uses.

The lesson I learned from this and other experiences is that even when the 
solution to a problem is presented to you as a coding job, and everyone around
you seems to agree with it, it is now _your_ problem and the solution is _your_
responsibility. Make sure you understand the problem, its priority, pro's and
cons and alternative solutions. Especially weigh in solutions that involve _not_
writing code, because code is a liability that is expensive to make, even more
expensive to maintain, and increases the risk of bugs.

In this case I was much more valuable as a coder that did his best not to code.
