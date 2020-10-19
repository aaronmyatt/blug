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