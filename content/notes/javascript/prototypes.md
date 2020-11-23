---
title: Javascript Prototypes
author: various
description: Studies in Javascript prototypical development
category: javascript
tags: javascript, js, prototypes
---
# Javascript Prototypes

[Mozilla Docs: Object Prototypes](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object_prototypes)

Prototypes enable Javascript objects to "inherit", or share, functionality to decendant objects (I am assuming that the new Javascript classes syntax is merely sugar on top of protoypes).

The Mozilla docs highlight that prototypically shared functionality does not "exist" on the decedants, but is "available" by walking the prototype chain up to parent objects directly. 
- How does that affect `this`?). 
  - `When an inherited function is executed, the value of this points to the inheriting object, not to the prototype object where the function is an own property.`
This parallels quite nicely to how we often talk of "walking the DOM (tree)".

Perhaps the most intriguing highlight is the notion that an objects prototype chain is not fixed at instantiation time. An objects prototype is "walked" on every call, so if it's parents prototype changes, the object benefits from that new functionality. I'm curious whether this could offer opportunities for fancy dynamic, contextual prototype hacking - or perhaps this is finally the intuition I needed to understand `bind` and `call`!

- `hasOwnProperty is the only thing in JavaScript which deals with properties and does not traverse the prototype chain.`
  - I've always used `hasOwnProperty` quite nievely to check for the existance of a property. Though I've never attempted to leverage the full power of prototypes so I've not shot myself in the foot yet!



