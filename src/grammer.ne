Main -> Predicate _ ":-" _ Body					{% d => ({ head: d[0], body: d[4] }) %}
	  | Predicate "."							{% d => d[0] %}

Body -> Predicate _ "," _ Body					{% d => Array.isArray(d[4])
													  ? [d[0], ...d[4]]
													  : [d[0], d[4]]
												%}
	  | Predicate "."							{% d => d[0] %}

Predicate -> Name "(" Clauses ")"				{% d => { var obj={}; obj[ d[0] ] = d[2]; return obj; } %}

Clauses -> Clause _ "," _ Clauses				{% d => [d[0], ...d[4]] %}
		 | Clause								{% d => d[0] %}

Clause -> "\"" Data "\""						{% d => d[1] %}
		| "'" Data "'"							{% d => d[1] %}
		| Name									{% d => d[0] %}
		
Data -> [a-zA-Z0-9 ]:+ 							{% d => d[0].join("") %}
Name -> [a-zA-Z]:+  							{% d => d[0].join("") %}

# Whitespace. The important thing here is that the postprocessor
# is a null-returning function. This is a memory efficiency trick.
_ -> [\s]:?     								{% d => null %}
