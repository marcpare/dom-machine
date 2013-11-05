DOM Machine
===========

A little project implementing a state machine to do a depth-first traversal of a DOM.

Driving question: how nice can prototypal inheritance make the task of parsing a DOM with a state machine?

Overall, pretty nice. You can pull out all of the state machine code into a prototype object, then put all of the states specific to your task into an object that extends this prototype.

Uses the very simple Underscore `extend` method, which just copies object properties. 

TODO
----

Use Grunt instead of a makefile
Configure a package.json for Bower