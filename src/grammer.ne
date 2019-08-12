@{%
const { lexer } = require('./lexer.js');
const first = d => d[0];
const second = d => d[1];
%}

@lexer lexer

Main -> Predicate %seperator Body %end				{% ([head, _, body]) => ({ head, body }) %}
     | Predicate %end									{% first %}

Body -> Predicate %comma Body							{% ([pred, _, body]) => Array.isArray(body)
													  				? [pred, ...body]
													  				: [pred, body]
																%}
     | Predicate											{% first %}

Predicate -> %field %lparen Clauses %rparen		{% ([ field, _, clauses]) => ({ [ field.value ]: clauses }) %}

Clauses -> Clause %comma Clauses						{% ([ clause, _, clauses]) => Array.isArray(clauses)
																	? [clause, ...clauses]
																	: [clause, clauses]	
																%}
        | Clause											{% first %}

Clause -> %string											{% ([ first ]) => first.value %}
       |  %field											{% ([ first ]) => first.value %}
