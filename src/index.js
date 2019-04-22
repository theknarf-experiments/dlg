var expand = require('datalog.js').expand,
    edb = [
      { edge: [ 'a', 'b' ] },
      { edge: [ 'a', 'c' ] },
      { edge: [ 'b', 'd' ] },
      { edge: [ 'c', 'd' ] },
      { edge: [ 'd', 'e' ] }
    ],
    idb = [
    {
      head: { path: [ 'X', 'Y'] }, // :-
      body: [ { edge: [ 'X', 'Y' ]} ]
    },
    {
      head: { path: [ 'X', 'Y'] }, // :-
      body: [ { path: [ 'X', 'Z' ]}, { path: [ 'Z', 'Y' ]} ],
    }
  ];

/*
  Graph used in the example:

    /-> b \
  a        -> d -> e
    \-> c /

  Paths:
    (a,b), (a,c), (b,d), (c,d), (d,e)
    (a,d), (b,e), (c,e)
    (a,e)
*/

console.log(expand(edb, idb));
