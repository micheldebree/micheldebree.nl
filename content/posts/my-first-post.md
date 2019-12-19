---
title: 'My First Post'
date: 2019-12-03T17:25:57+01:00
draft: true
---

## Test

```java
 private <V> V processResponse(Supplier<ResponseEntity<V>> restCall)
      throws ToepasbareRegelsRestClientException {
    try {
      ResponseEntity<V> response = restCall.get();
      return Objects.requireNonNull(response.getBody());
    } catch (RestClientResponseException e) {
      throw processRestClientResponseException(e);
    } catch (RestClientException e) {
      throw new ToepasbareRegelsRestClientException(e.getMessage(), e);
    }
  }
```
