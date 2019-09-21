# Composi Program Composition

Composition of functional components is easy. Runtime programs can also be composed. You just need to be aware of how they work to make that happen. This reposition contains three examples of program composition.

## composition-1

This example shows how one runtime program can be consumed by another. In this case the child program just returns the markup that will be consumed by the parent program's view.
We also hyjack the child's init and update methods to use in the parent program so that it can get the state of the child to display in its own markup. That way, as the user interacts with the child program, the parent program updates too.

## composition-2

This example shows parent to child communication, where the parent program determines what the start value of the child program's state should be. This effectively overrides the child program's default state.


## composition-3

This example shows child to parent communication, where the child program informs the parent of its updated state. The parent uses this to determine if the maximum value has been reached. When reached, the parent ignores any further state messages from the child and renders it with the maximum value.
