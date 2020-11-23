---
title: Vue 3 Deep Dive with Evan You 
description: Notes from the Vue Mastery course
category: vue
tags: vue_mastery, vue3 
---
# Vue 3 Deep Dive with Evan You 

## Lesson 1: Overview
- Vue ingests our template strings, creates a render function, which returns a Virtual Node (VNode) to manage updates to the DOM
  - Template -> Render Function -> Virtual   Node -> DOM
- Vue3 has 3 core modules
  - Reactivity: Watches objects for changes
  - Compiler: Templates to render functions
  - Renderer
    - Render Phase
    - Mount Phase
    - Patch Phase

## Lesson 2: Virtual DOM / Render Functions
- import { h } from 'vue';

## Lessonn 3: Compiler & Render Fucntions

## Lesson 4/5/6: 

## Lesson 7: Intro to Reactivity
Monitor all dependencies at the least burdensome granularity in order to re-render/reload exactly that parts of your UI or application that are affected by changes in those dependencies.

## Lesson 8: Building Reactivity from Scratch
activeEffect = null;
class Deps() {
  depends(){

  }
  notify(){
    
  }
}
function watchEffect(effect){}

## Lesson 9: Building the Reactive API
Consider learning of:
- WeakMap / Map - "WeakMap is garbage collectable", Evan You
- Proxy (ES6)
- Reflect

## Lesson 10: Creating a Mini Vue

## Lesson 11: Composition API
`import { reactive, watchEffect, watch, onMounted, ref, computed } from 'vue';`

So the composition API is exposing the building blocks of Vue. This enables up to create components with much finer APIs, using code that can be conveniently shared across many components.

E.g. onMounted() is automagically associated to the component it is called within, enabling it to be wrapped in a function and shared across components:

```
function sharedMountLogic(){
  onMounted(){
    // dosomething
  }
}
```

`watchEffect` is a lower level `watch` which is called once upon the `setup` lifecycle hook, and will respond to changes to its "dependencies". While `watch` will only be called whenever its "dependencies" (can I say - "dependent refs"?) are updated.

It is curious now to learn that all reactivity is based upon `ref`, as all values are wrapped up in this proxy object which allows their `get` operations to be observed and changes propagated via the reactivity system - and then `computed` operations are "simply" a dynamic ref.

## Lesson 12: Code Organisation
"You can always extract any part of your composition API into functions" - E.You

## Lesson 13: Logic Reuse
setup() all the way lolz

## Lesson 14: Composition API Example
`ref` `watchEffect` === magic
