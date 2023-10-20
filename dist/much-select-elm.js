// -- (function(scope){
// -- 'use strict';

function F(arity, fun, wrapper) {
  wrapper.a = arity;
  wrapper.f = fun;
  return wrapper;
}

function F2(fun) {
  return F(2, fun, function(a) { return function(b) { return fun(a,b); }; })
}
function F3(fun) {
  return F(3, fun, function(a) {
    return function(b) { return function(c) { return fun(a, b, c); }; };
  });
}
function F4(fun) {
  return F(4, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return fun(a, b, c, d); }; }; };
  });
}
function F5(fun) {
  return F(5, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return fun(a, b, c, d, e); }; }; }; };
  });
}
function F6(fun) {
  return F(6, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return fun(a, b, c, d, e, f); }; }; }; }; };
  });
}
function F7(fun) {
  return F(7, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return fun(a, b, c, d, e, f, g); }; }; }; }; }; };
  });
}
function F8(fun) {
  return F(8, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) {
    return fun(a, b, c, d, e, f, g, h); }; }; }; }; }; }; };
  });
}
function F9(fun) {
  return F(9, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) { return function(i) {
    return fun(a, b, c, d, e, f, g, h, i); }; }; }; }; }; }; }; };
  });
}

function A2(fun, a, b) {
  return fun.a === 2 ? fun.f(a, b) : fun(a)(b);
}
function A3(fun, a, b, c) {
  return fun.a === 3 ? fun.f(a, b, c) : fun(a)(b)(c);
}
function A4(fun, a, b, c, d) {
  return fun.a === 4 ? fun.f(a, b, c, d) : fun(a)(b)(c)(d);
}
function A5(fun, a, b, c, d, e) {
  return fun.a === 5 ? fun.f(a, b, c, d, e) : fun(a)(b)(c)(d)(e);
}
function A6(fun, a, b, c, d, e, f) {
  return fun.a === 6 ? fun.f(a, b, c, d, e, f) : fun(a)(b)(c)(d)(e)(f);
}
function A7(fun, a, b, c, d, e, f, g) {
  return fun.a === 7 ? fun.f(a, b, c, d, e, f, g) : fun(a)(b)(c)(d)(e)(f)(g);
}
function A8(fun, a, b, c, d, e, f, g, h) {
  return fun.a === 8 ? fun.f(a, b, c, d, e, f, g, h) : fun(a)(b)(c)(d)(e)(f)(g)(h);
}
function A9(fun, a, b, c, d, e, f, g, h, i) {
  return fun.a === 9 ? fun.f(a, b, c, d, e, f, g, h, i) : fun(a)(b)(c)(d)(e)(f)(g)(h)(i);
}




var _JsArray_empty = [];

function _JsArray_singleton(value)
{
    return [value];
}

function _JsArray_length(array)
{
    return array.length;
}

var _JsArray_initialize = F3(function(size, offset, func)
{
    var result = new Array(size);

    for (var i = 0; i < size; i++)
    {
        result[i] = func(offset + i);
    }

    return result;
});

var _JsArray_initializeFromList = F2(function (max, ls)
{
    var result = new Array(max);

    for (var i = 0; i < max && ls.b; i++)
    {
        result[i] = ls.a;
        ls = ls.b;
    }

    result.length = i;
    return _Utils_Tuple2(result, ls);
});

var _JsArray_unsafeGet = F2(function(index, array)
{
    return array[index];
});

var _JsArray_unsafeSet = F3(function(index, value, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[index] = value;
    return result;
});

var _JsArray_push = F2(function(value, array)
{
    var length = array.length;
    var result = new Array(length + 1);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[length] = value;
    return result;
});

var _JsArray_foldl = F3(function(func, acc, array)
{
    var length = array.length;

    for (var i = 0; i < length; i++)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_foldr = F3(function(func, acc, array)
{
    for (var i = array.length - 1; i >= 0; i--)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_map = F2(function(func, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = func(array[i]);
    }

    return result;
});

var _JsArray_indexedMap = F3(function(func, offset, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = A2(func, offset + i, array[i]);
    }

    return result;
});

var _JsArray_slice = F3(function(from, to, array)
{
    return array.slice(from, to);
});

var _JsArray_appendN = F3(function(n, dest, source)
{
    var destLen = dest.length;
    var itemsToCopy = n - destLen;

    if (itemsToCopy > source.length)
    {
        itemsToCopy = source.length;
    }

    var size = destLen + itemsToCopy;
    var result = new Array(size);

    for (var i = 0; i < destLen; i++)
    {
        result[i] = dest[i];
    }

    for (var i = 0; i < itemsToCopy; i++)
    {
        result[i + destLen] = source[i];
    }

    return result;
});



// LOG

var _Debug_log = F2(function(tag, value)
{
	return value;
});

var _Debug_log_UNUSED = F2(function(tag, value)
{
	console.log(tag + ': ' + _Debug_toString(value));
	return value;
});


// TODOS

function _Debug_todo(moduleName, region)
{
	return function(message) {
		_Debug_crash(8, moduleName, region, message);
	};
}

function _Debug_todoCase(moduleName, region, value)
{
	return function(message) {
		_Debug_crash(9, moduleName, region, value, message);
	};
}


// TO STRING

function _Debug_toString(value)
{
	return '<internals>';
}

function _Debug_toString_UNUSED(value)
{
	return _Debug_toAnsiString(false, value);
}

function _Debug_toAnsiString(ansi, value)
{
	if (typeof value === 'function')
	{
		return _Debug_internalColor(ansi, '<function>');
	}

	if (typeof value === 'boolean')
	{
		return _Debug_ctorColor(ansi, value ? 'True' : 'False');
	}

	if (typeof value === 'number')
	{
		return _Debug_numberColor(ansi, value + '');
	}

	if (value instanceof String)
	{
		return _Debug_charColor(ansi, "'" + _Debug_addSlashes(value, true) + "'");
	}

	if (typeof value === 'string')
	{
		return _Debug_stringColor(ansi, '"' + _Debug_addSlashes(value, false) + '"');
	}

	if (typeof value === 'object' && '$' in value)
	{
		var tag = value.$;

		if (typeof tag === 'number')
		{
			return _Debug_internalColor(ansi, '<internals>');
		}

		if (tag[0] === '#')
		{
			var output = [];
			for (var k in value)
			{
				if (k === '$') continue;
				output.push(_Debug_toAnsiString(ansi, value[k]));
			}
			return '(' + output.join(',') + ')';
		}

		if (tag === 'Set_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Set')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Set$toList(value));
		}

		if (tag === 'RBNode_elm_builtin' || tag === 'RBEmpty_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Dict')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Dict$toList(value));
		}

		if (tag === 'Array_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Array')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Array$toList(value));
		}

		if (tag === '::' || tag === '[]')
		{
			var output = '[';

			value.b && (output += _Debug_toAnsiString(ansi, value.a), value = value.b)

			for (; value.b; value = value.b) // WHILE_CONS
			{
				output += ',' + _Debug_toAnsiString(ansi, value.a);
			}
			return output + ']';
		}

		var output = '';
		for (var i in value)
		{
			if (i === '$') continue;
			var str = _Debug_toAnsiString(ansi, value[i]);
			var c0 = str[0];
			var parenless = c0 === '{' || c0 === '(' || c0 === '[' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
			output += ' ' + (parenless ? str : '(' + str + ')');
		}
		return _Debug_ctorColor(ansi, tag) + output;
	}

	if (typeof DataView === 'function' && value instanceof DataView)
	{
		return _Debug_stringColor(ansi, '<' + value.byteLength + ' bytes>');
	}

	if (typeof File !== 'undefined' && value instanceof File)
	{
		return _Debug_internalColor(ansi, '<' + value.name + '>');
	}

	if (typeof value === 'object')
	{
		var output = [];
		for (var key in value)
		{
			var field = key[0] === '_' ? key.slice(1) : key;
			output.push(_Debug_fadeColor(ansi, field) + ' = ' + _Debug_toAnsiString(ansi, value[key]));
		}
		if (output.length === 0)
		{
			return '{}';
		}
		return '{ ' + output.join(', ') + ' }';
	}

	return _Debug_internalColor(ansi, '<internals>');
}

function _Debug_addSlashes(str, isChar)
{
	var s = str
		.replace(/\\/g, '\\\\')
		.replace(/\n/g, '\\n')
		.replace(/\t/g, '\\t')
		.replace(/\r/g, '\\r')
		.replace(/\v/g, '\\v')
		.replace(/\0/g, '\\0');

	if (isChar)
	{
		return s.replace(/\'/g, '\\\'');
	}
	else
	{
		return s.replace(/\"/g, '\\"');
	}
}

function _Debug_ctorColor(ansi, string)
{
	return ansi ? '\x1b[96m' + string + '\x1b[0m' : string;
}

function _Debug_numberColor(ansi, string)
{
	return ansi ? '\x1b[95m' + string + '\x1b[0m' : string;
}

function _Debug_stringColor(ansi, string)
{
	return ansi ? '\x1b[93m' + string + '\x1b[0m' : string;
}

function _Debug_charColor(ansi, string)
{
	return ansi ? '\x1b[92m' + string + '\x1b[0m' : string;
}

function _Debug_fadeColor(ansi, string)
{
	return ansi ? '\x1b[37m' + string + '\x1b[0m' : string;
}

function _Debug_internalColor(ansi, string)
{
	return ansi ? '\x1b[36m' + string + '\x1b[0m' : string;
}

function _Debug_toHexDigit(n)
{
	return String.fromCharCode(n < 10 ? 48 + n : 55 + n);
}


// CRASH


function _Debug_crash(identifier)
{
	throw new Error('https://github.com/elm/core/blob/1.0.0/hints/' + identifier + '.md');
}


function _Debug_crash_UNUSED(identifier, fact1, fact2, fact3, fact4)
{
	switch(identifier)
	{
		case 0:
			throw new Error('What node should I take over? In JavaScript I need something like:\n\n    Elm.Main.init({\n        node: document.getElementById("elm-node")\n    })\n\nYou need to do this with any Browser.sandbox or Browser.element program.');

		case 1:
			throw new Error('Browser.application programs cannot handle URLs like this:\n\n    ' + document.location.href + '\n\nWhat is the root? The root of your file system? Try looking at this program with `elm reactor` or some other server.');

		case 2:
			var jsonErrorString = fact1;
			throw new Error('Problem with the flags given to your Elm program on initialization.\n\n' + jsonErrorString);

		case 3:
			var portName = fact1;
			throw new Error('There can only be one port named `' + portName + '`, but your program has multiple.');

		case 4:
			var portName = fact1;
			var problem = fact2;
			throw new Error('Trying to send an unexpected type of value through port `' + portName + '`:\n' + problem);

		case 5:
			throw new Error('Trying to use `(==)` on functions.\nThere is no way to know if functions are "the same" in the Elm sense.\nRead more about this at https://package.elm-lang.org/packages/elm/core/latest/Basics#== which describes why it is this way and what the better version will look like.');

		case 6:
			var moduleName = fact1;
			throw new Error('Your page is loading multiple Elm scripts with a module named ' + moduleName + '. Maybe a duplicate script is getting loaded accidentally? If not, rename one of them so I know which is which!');

		case 8:
			var moduleName = fact1;
			var region = fact2;
			var message = fact3;
			throw new Error('TODO in module `' + moduleName + '` ' + _Debug_regionToString(region) + '\n\n' + message);

		case 9:
			var moduleName = fact1;
			var region = fact2;
			var value = fact3;
			var message = fact4;
			throw new Error(
				'TODO in module `' + moduleName + '` from the `case` expression '
				+ _Debug_regionToString(region) + '\n\nIt received the following value:\n\n    '
				+ _Debug_toString(value).replace('\n', '\n    ')
				+ '\n\nBut the branch that handles it says:\n\n    ' + message.replace('\n', '\n    ')
			);

		case 10:
			throw new Error('Bug in https://github.com/elm/virtual-dom/issues');

		case 11:
			throw new Error('Cannot perform mod 0. Division by zero error.');
	}
}

function _Debug_regionToString(region)
{
	if (region.d7.aC === region.c5.aC)
	{
		return 'on line ' + region.d7.aC;
	}
	return 'on lines ' + region.d7.aC + ' through ' + region.c5.aC;
}



// EQUALITY

function _Utils_eq(x, y)
{
	for (
		var pair, stack = [], isEqual = _Utils_eqHelp(x, y, 0, stack);
		isEqual && (pair = stack.pop());
		isEqual = _Utils_eqHelp(pair.a, pair.b, 0, stack)
		)
	{}

	return isEqual;
}

function _Utils_eqHelp(x, y, depth, stack)
{
	if (x === y)
	{
		return true;
	}

	if (typeof x !== 'object' || x === null || y === null)
	{
		typeof x === 'function' && _Debug_crash(5);
		return false;
	}

	if (depth > 100)
	{
		stack.push(_Utils_Tuple2(x,y));
		return true;
	}

	/**_UNUSED/
	if (x.$ === 'Set_elm_builtin')
	{
		x = $elm$core$Set$toList(x);
		y = $elm$core$Set$toList(y);
	}
	if (x.$ === 'RBNode_elm_builtin' || x.$ === 'RBEmpty_elm_builtin')
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	/**/
	if (x.$ < 0)
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	for (var key in x)
	{
		if (!_Utils_eqHelp(x[key], y[key], depth + 1, stack))
		{
			return false;
		}
	}
	return true;
}

var _Utils_equal = F2(_Utils_eq);
var _Utils_notEqual = F2(function(a, b) { return !_Utils_eq(a,b); });



// COMPARISONS

// Code in Generate/JavaScript.hs, Basics.js, and List.js depends on
// the particular integer values assigned to LT, EQ, and GT.

function _Utils_cmp(x, y, ord)
{
	if (typeof x !== 'object')
	{
		return x === y ? /*EQ*/ 0 : x < y ? /*LT*/ -1 : /*GT*/ 1;
	}

	/**_UNUSED/
	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? 0 : a < b ? -1 : 1;
	}
	//*/

	/**/
	if (typeof x.$ === 'undefined')
	//*/
	/**_UNUSED/
	if (x.$[0] === '#')
	//*/
	{
		return (ord = _Utils_cmp(x.a, y.a))
			? ord
			: (ord = _Utils_cmp(x.b, y.b))
				? ord
				: _Utils_cmp(x.c, y.c);
	}

	// traverse conses until end of a list or a mismatch
	for (; x.b && y.b && !(ord = _Utils_cmp(x.a, y.a)); x = x.b, y = y.b) {} // WHILE_CONSES
	return ord || (x.b ? /*GT*/ 1 : y.b ? /*LT*/ -1 : /*EQ*/ 0);
}

var _Utils_lt = F2(function(a, b) { return _Utils_cmp(a, b) < 0; });
var _Utils_le = F2(function(a, b) { return _Utils_cmp(a, b) < 1; });
var _Utils_gt = F2(function(a, b) { return _Utils_cmp(a, b) > 0; });
var _Utils_ge = F2(function(a, b) { return _Utils_cmp(a, b) >= 0; });

var _Utils_compare = F2(function(x, y)
{
	var n = _Utils_cmp(x, y);
	return n < 0 ? $elm$core$Basics$LT : n ? $elm$core$Basics$GT : $elm$core$Basics$EQ;
});


// COMMON VALUES

var _Utils_Tuple0 = 0;
var _Utils_Tuple0_UNUSED = { $: '#0' };

function _Utils_Tuple2(a, b) { return { a: a, b: b }; }
function _Utils_Tuple2_UNUSED(a, b) { return { $: '#2', a: a, b: b }; }

function _Utils_Tuple3(a, b, c) { return { a: a, b: b, c: c }; }
function _Utils_Tuple3_UNUSED(a, b, c) { return { $: '#3', a: a, b: b, c: c }; }

function _Utils_chr(c) { return c; }
function _Utils_chr_UNUSED(c) { return new String(c); }


// RECORDS

function _Utils_update(oldRecord, updatedFields)
{
	var newRecord = {};

	for (var key in oldRecord)
	{
		newRecord[key] = oldRecord[key];
	}

	for (var key in updatedFields)
	{
		newRecord[key] = updatedFields[key];
	}

	return newRecord;
}


// APPEND

var _Utils_append = F2(_Utils_ap);

function _Utils_ap(xs, ys)
{
	// append Strings
	if (typeof xs === 'string')
	{
		return xs + ys;
	}

	// append Lists
	if (!xs.b)
	{
		return ys;
	}
	var root = _List_Cons(xs.a, ys);
	xs = xs.b
	for (var curr = root; xs.b; xs = xs.b) // WHILE_CONS
	{
		curr = curr.b = _List_Cons(xs.a, ys);
	}
	return root;
}



var _List_Nil = { $: 0 };
var _List_Nil_UNUSED = { $: '[]' };

function _List_Cons(hd, tl) { return { $: 1, a: hd, b: tl }; }
function _List_Cons_UNUSED(hd, tl) { return { $: '::', a: hd, b: tl }; }


var _List_cons = F2(_List_Cons);

function _List_fromArray(arr)
{
	var out = _List_Nil;
	for (var i = arr.length; i--; )
	{
		out = _List_Cons(arr[i], out);
	}
	return out;
}

function _List_toArray(xs)
{
	for (var out = []; xs.b; xs = xs.b) // WHILE_CONS
	{
		out.push(xs.a);
	}
	return out;
}

var _List_map2 = F3(function(f, xs, ys)
{
	for (var arr = []; xs.b && ys.b; xs = xs.b, ys = ys.b) // WHILE_CONSES
	{
		arr.push(A2(f, xs.a, ys.a));
	}
	return _List_fromArray(arr);
});

var _List_map3 = F4(function(f, xs, ys, zs)
{
	for (var arr = []; xs.b && ys.b && zs.b; xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A3(f, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map4 = F5(function(f, ws, xs, ys, zs)
{
	for (var arr = []; ws.b && xs.b && ys.b && zs.b; ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A4(f, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map5 = F6(function(f, vs, ws, xs, ys, zs)
{
	for (var arr = []; vs.b && ws.b && xs.b && ys.b && zs.b; vs = vs.b, ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A5(f, vs.a, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_sortBy = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		return _Utils_cmp(f(a), f(b));
	}));
});

var _List_sortWith = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		var ord = A2(f, a, b);
		return ord === $elm$core$Basics$EQ ? 0 : ord === $elm$core$Basics$LT ? -1 : 1;
	}));
});



// MATH

var _Basics_add = F2(function(a, b) { return a + b; });
var _Basics_sub = F2(function(a, b) { return a - b; });
var _Basics_mul = F2(function(a, b) { return a * b; });
var _Basics_fdiv = F2(function(a, b) { return a / b; });
var _Basics_idiv = F2(function(a, b) { return (a / b) | 0; });
var _Basics_pow = F2(Math.pow);

var _Basics_remainderBy = F2(function(b, a) { return a % b; });

// https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/divmodnote-letter.pdf
var _Basics_modBy = F2(function(modulus, x)
{
	var answer = x % modulus;
	return modulus === 0
		? _Debug_crash(11)
		:
	((answer > 0 && modulus < 0) || (answer < 0 && modulus > 0))
		? answer + modulus
		: answer;
});


// TRIGONOMETRY

var _Basics_pi = Math.PI;
var _Basics_e = Math.E;
var _Basics_cos = Math.cos;
var _Basics_sin = Math.sin;
var _Basics_tan = Math.tan;
var _Basics_acos = Math.acos;
var _Basics_asin = Math.asin;
var _Basics_atan = Math.atan;
var _Basics_atan2 = F2(Math.atan2);


// MORE MATH

function _Basics_toFloat(x) { return x; }
function _Basics_truncate(n) { return n | 0; }
function _Basics_isInfinite(n) { return n === Infinity || n === -Infinity; }

var _Basics_ceiling = Math.ceil;
var _Basics_floor = Math.floor;
var _Basics_round = Math.round;
var _Basics_sqrt = Math.sqrt;
var _Basics_log = Math.log;
var _Basics_isNaN = isNaN;


// BOOLEANS

function _Basics_not(bool) { return !bool; }
var _Basics_and = F2(function(a, b) { return a && b; });
var _Basics_or  = F2(function(a, b) { return a || b; });
var _Basics_xor = F2(function(a, b) { return a !== b; });



var _String_cons = F2(function(chr, str)
{
	return chr + str;
});

function _String_uncons(string)
{
	var word = string.charCodeAt(0);
	return !isNaN(word)
		? $elm$core$Maybe$Just(
			0xD800 <= word && word <= 0xDBFF
				? _Utils_Tuple2(_Utils_chr(string[0] + string[1]), string.slice(2))
				: _Utils_Tuple2(_Utils_chr(string[0]), string.slice(1))
		)
		: $elm$core$Maybe$Nothing;
}

var _String_append = F2(function(a, b)
{
	return a + b;
});

function _String_length(str)
{
	return str.length;
}

var _String_map = F2(function(func, string)
{
	var len = string.length;
	var array = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = string.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			array[i] = func(_Utils_chr(string[i] + string[i+1]));
			i += 2;
			continue;
		}
		array[i] = func(_Utils_chr(string[i]));
		i++;
	}
	return array.join('');
});

var _String_filter = F2(function(isGood, str)
{
	var arr = [];
	var len = str.length;
	var i = 0;
	while (i < len)
	{
		var char = str[i];
		var word = str.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += str[i];
			i++;
		}

		if (isGood(_Utils_chr(char)))
		{
			arr.push(char);
		}
	}
	return arr.join('');
});

function _String_reverse(str)
{
	var len = str.length;
	var arr = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = str.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			arr[len - i] = str[i + 1];
			i++;
			arr[len - i] = str[i - 1];
			i++;
		}
		else
		{
			arr[len - i] = str[i];
			i++;
		}
	}
	return arr.join('');
}

var _String_foldl = F3(function(func, state, string)
{
	var len = string.length;
	var i = 0;
	while (i < len)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += string[i];
			i++;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_foldr = F3(function(func, state, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_split = F2(function(sep, str)
{
	return str.split(sep);
});

var _String_join = F2(function(sep, strs)
{
	return strs.join(sep);
});

var _String_slice = F3(function(start, end, str) {
	return str.slice(start, end);
});

function _String_trim(str)
{
	return str.trim();
}

function _String_trimLeft(str)
{
	return str.replace(/^\s+/, '');
}

function _String_trimRight(str)
{
	return str.replace(/\s+$/, '');
}

function _String_words(str)
{
	return _List_fromArray(str.trim().split(/\s+/g));
}

function _String_lines(str)
{
	return _List_fromArray(str.split(/\r\n|\r|\n/g));
}

function _String_toUpper(str)
{
	return str.toUpperCase();
}

function _String_toLower(str)
{
	return str.toLowerCase();
}

var _String_any = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (isGood(_Utils_chr(char)))
		{
			return true;
		}
	}
	return false;
});

var _String_all = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (!isGood(_Utils_chr(char)))
		{
			return false;
		}
	}
	return true;
});

var _String_contains = F2(function(sub, str)
{
	return str.indexOf(sub) > -1;
});

var _String_startsWith = F2(function(sub, str)
{
	return str.indexOf(sub) === 0;
});

var _String_endsWith = F2(function(sub, str)
{
	return str.length >= sub.length &&
		str.lastIndexOf(sub) === str.length - sub.length;
});

var _String_indexes = F2(function(sub, str)
{
	var subLen = sub.length;

	if (subLen < 1)
	{
		return _List_Nil;
	}

	var i = 0;
	var is = [];

	while ((i = str.indexOf(sub, i)) > -1)
	{
		is.push(i);
		i = i + subLen;
	}

	return _List_fromArray(is);
});


// TO STRING

function _String_fromNumber(number)
{
	return number + '';
}


// INT CONVERSIONS

function _String_toInt(str)
{
	var total = 0;
	var code0 = str.charCodeAt(0);
	var start = code0 == 0x2B /* + */ || code0 == 0x2D /* - */ ? 1 : 0;

	for (var i = start; i < str.length; ++i)
	{
		var code = str.charCodeAt(i);
		if (code < 0x30 || 0x39 < code)
		{
			return $elm$core$Maybe$Nothing;
		}
		total = 10 * total + code - 0x30;
	}

	return i == start
		? $elm$core$Maybe$Nothing
		: $elm$core$Maybe$Just(code0 == 0x2D ? -total : total);
}


// FLOAT CONVERSIONS

function _String_toFloat(s)
{
	// check if it is a hex, octal, or binary number
	if (s.length === 0 || /[\sxbo]/.test(s))
	{
		return $elm$core$Maybe$Nothing;
	}
	var n = +s;
	// faster isNaN check
	return n === n ? $elm$core$Maybe$Just(n) : $elm$core$Maybe$Nothing;
}

function _String_fromList(chars)
{
	return _List_toArray(chars).join('');
}




function _Char_toCode(char)
{
	var code = char.charCodeAt(0);
	if (0xD800 <= code && code <= 0xDBFF)
	{
		return (code - 0xD800) * 0x400 + char.charCodeAt(1) - 0xDC00 + 0x10000
	}
	return code;
}

function _Char_fromCode(code)
{
	return _Utils_chr(
		(code < 0 || 0x10FFFF < code)
			? '\uFFFD'
			:
		(code <= 0xFFFF)
			? String.fromCharCode(code)
			:
		(code -= 0x10000,
			String.fromCharCode(Math.floor(code / 0x400) + 0xD800, code % 0x400 + 0xDC00)
		)
	);
}

function _Char_toUpper(char)
{
	return _Utils_chr(char.toUpperCase());
}

function _Char_toLower(char)
{
	return _Utils_chr(char.toLowerCase());
}

function _Char_toLocaleUpper(char)
{
	return _Utils_chr(char.toLocaleUpperCase());
}

function _Char_toLocaleLower(char)
{
	return _Utils_chr(char.toLocaleLowerCase());
}



/**_UNUSED/
function _Json_errorToString(error)
{
	return $elm$json$Json$Decode$errorToString(error);
}
//*/


// CORE DECODERS

function _Json_succeed(msg)
{
	return {
		$: 0,
		a: msg
	};
}

function _Json_fail(msg)
{
	return {
		$: 1,
		a: msg
	};
}

function _Json_decodePrim(decoder)
{
	return { $: 2, b: decoder };
}

var _Json_decodeInt = _Json_decodePrim(function(value) {
	return (typeof value !== 'number')
		? _Json_expecting('an INT', value)
		:
	(-2147483647 < value && value < 2147483647 && (value | 0) === value)
		? $elm$core$Result$Ok(value)
		:
	(isFinite(value) && !(value % 1))
		? $elm$core$Result$Ok(value)
		: _Json_expecting('an INT', value);
});

var _Json_decodeBool = _Json_decodePrim(function(value) {
	return (typeof value === 'boolean')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a BOOL', value);
});

var _Json_decodeFloat = _Json_decodePrim(function(value) {
	return (typeof value === 'number')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a FLOAT', value);
});

var _Json_decodeValue = _Json_decodePrim(function(value) {
	return $elm$core$Result$Ok(_Json_wrap(value));
});

var _Json_decodeString = _Json_decodePrim(function(value) {
	return (typeof value === 'string')
		? $elm$core$Result$Ok(value)
		: (value instanceof String)
			? $elm$core$Result$Ok(value + '')
			: _Json_expecting('a STRING', value);
});

function _Json_decodeList(decoder) { return { $: 3, b: decoder }; }
function _Json_decodeArray(decoder) { return { $: 4, b: decoder }; }

function _Json_decodeNull(value) { return { $: 5, c: value }; }

var _Json_decodeField = F2(function(field, decoder)
{
	return {
		$: 6,
		d: field,
		b: decoder
	};
});

var _Json_decodeIndex = F2(function(index, decoder)
{
	return {
		$: 7,
		e: index,
		b: decoder
	};
});

function _Json_decodeKeyValuePairs(decoder)
{
	return {
		$: 8,
		b: decoder
	};
}

function _Json_mapMany(f, decoders)
{
	return {
		$: 9,
		f: f,
		g: decoders
	};
}

var _Json_andThen = F2(function(callback, decoder)
{
	return {
		$: 10,
		b: decoder,
		h: callback
	};
});

function _Json_oneOf(decoders)
{
	return {
		$: 11,
		g: decoders
	};
}


// DECODING OBJECTS

var _Json_map1 = F2(function(f, d1)
{
	return _Json_mapMany(f, [d1]);
});

var _Json_map2 = F3(function(f, d1, d2)
{
	return _Json_mapMany(f, [d1, d2]);
});

var _Json_map3 = F4(function(f, d1, d2, d3)
{
	return _Json_mapMany(f, [d1, d2, d3]);
});

var _Json_map4 = F5(function(f, d1, d2, d3, d4)
{
	return _Json_mapMany(f, [d1, d2, d3, d4]);
});

var _Json_map5 = F6(function(f, d1, d2, d3, d4, d5)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5]);
});

var _Json_map6 = F7(function(f, d1, d2, d3, d4, d5, d6)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6]);
});

var _Json_map7 = F8(function(f, d1, d2, d3, d4, d5, d6, d7)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7]);
});

var _Json_map8 = F9(function(f, d1, d2, d3, d4, d5, d6, d7, d8)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7, d8]);
});


// DECODE

var _Json_runOnString = F2(function(decoder, string)
{
	try
	{
		var value = JSON.parse(string);
		return _Json_runHelp(decoder, value);
	}
	catch (e)
	{
		return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'This is not valid JSON! ' + e.message, _Json_wrap(string)));
	}
});

var _Json_run = F2(function(decoder, value)
{
	return _Json_runHelp(decoder, _Json_unwrap(value));
});

function _Json_runHelp(decoder, value)
{
	switch (decoder.$)
	{
		case 2:
			return decoder.b(value);

		case 5:
			return (value === null)
				? $elm$core$Result$Ok(decoder.c)
				: _Json_expecting('null', value);

		case 3:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('a LIST', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _List_fromArray);

		case 4:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _Json_toElmArray);

		case 6:
			var field = decoder.d;
			if (typeof value !== 'object' || value === null || !(field in value))
			{
				return _Json_expecting('an OBJECT with a field named `' + field + '`', value);
			}
			var result = _Json_runHelp(decoder.b, value[field]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, field, result.a));

		case 7:
			var index = decoder.e;
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			if (index >= value.length)
			{
				return _Json_expecting('a LONGER array. Need index ' + index + ' but only see ' + value.length + ' entries', value);
			}
			var result = _Json_runHelp(decoder.b, value[index]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, index, result.a));

		case 8:
			if (typeof value !== 'object' || value === null || _Json_isArray(value))
			{
				return _Json_expecting('an OBJECT', value);
			}

			var keyValuePairs = _List_Nil;
			// TODO test perf of Object.keys and switch when support is good enough
			for (var key in value)
			{
				if (value.hasOwnProperty(key))
				{
					var result = _Json_runHelp(decoder.b, value[key]);
					if (!$elm$core$Result$isOk(result))
					{
						return $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, key, result.a));
					}
					keyValuePairs = _List_Cons(_Utils_Tuple2(key, result.a), keyValuePairs);
				}
			}
			return $elm$core$Result$Ok($elm$core$List$reverse(keyValuePairs));

		case 9:
			var answer = decoder.f;
			var decoders = decoder.g;
			for (var i = 0; i < decoders.length; i++)
			{
				var result = _Json_runHelp(decoders[i], value);
				if (!$elm$core$Result$isOk(result))
				{
					return result;
				}
				answer = answer(result.a);
			}
			return $elm$core$Result$Ok(answer);

		case 10:
			var result = _Json_runHelp(decoder.b, value);
			return (!$elm$core$Result$isOk(result))
				? result
				: _Json_runHelp(decoder.h(result.a), value);

		case 11:
			var errors = _List_Nil;
			for (var temp = decoder.g; temp.b; temp = temp.b) // WHILE_CONS
			{
				var result = _Json_runHelp(temp.a, value);
				if ($elm$core$Result$isOk(result))
				{
					return result;
				}
				errors = _List_Cons(result.a, errors);
			}
			return $elm$core$Result$Err($elm$json$Json$Decode$OneOf($elm$core$List$reverse(errors)));

		case 1:
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, decoder.a, _Json_wrap(value)));

		case 0:
			return $elm$core$Result$Ok(decoder.a);
	}
}

function _Json_runArrayDecoder(decoder, value, toElmValue)
{
	var len = value.length;
	var array = new Array(len);
	for (var i = 0; i < len; i++)
	{
		var result = _Json_runHelp(decoder, value[i]);
		if (!$elm$core$Result$isOk(result))
		{
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, i, result.a));
		}
		array[i] = result.a;
	}
	return $elm$core$Result$Ok(toElmValue(array));
}

function _Json_isArray(value)
{
	return Array.isArray(value) || (typeof FileList !== 'undefined' && value instanceof FileList);
}

function _Json_toElmArray(array)
{
	return A2($elm$core$Array$initialize, array.length, function(i) { return array[i]; });
}

function _Json_expecting(type, value)
{
	return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'Expecting ' + type, _Json_wrap(value)));
}


// EQUALITY

function _Json_equality(x, y)
{
	if (x === y)
	{
		return true;
	}

	if (x.$ !== y.$)
	{
		return false;
	}

	switch (x.$)
	{
		case 0:
		case 1:
			return x.a === y.a;

		case 2:
			return x.b === y.b;

		case 5:
			return x.c === y.c;

		case 3:
		case 4:
		case 8:
			return _Json_equality(x.b, y.b);

		case 6:
			return x.d === y.d && _Json_equality(x.b, y.b);

		case 7:
			return x.e === y.e && _Json_equality(x.b, y.b);

		case 9:
			return x.f === y.f && _Json_listEquality(x.g, y.g);

		case 10:
			return x.h === y.h && _Json_equality(x.b, y.b);

		case 11:
			return _Json_listEquality(x.g, y.g);
	}
}

function _Json_listEquality(aDecoders, bDecoders)
{
	var len = aDecoders.length;
	if (len !== bDecoders.length)
	{
		return false;
	}
	for (var i = 0; i < len; i++)
	{
		if (!_Json_equality(aDecoders[i], bDecoders[i]))
		{
			return false;
		}
	}
	return true;
}


// ENCODE

var _Json_encode = F2(function(indentLevel, value)
{
	return JSON.stringify(_Json_unwrap(value), null, indentLevel) + '';
});

function _Json_wrap_UNUSED(value) { return { $: 0, a: value }; }
function _Json_unwrap_UNUSED(value) { return value.a; }

function _Json_wrap(value) { return value; }
function _Json_unwrap(value) { return value; }

function _Json_emptyArray() { return []; }
function _Json_emptyObject() { return {}; }

var _Json_addField = F3(function(key, value, object)
{
	object[key] = _Json_unwrap(value);
	return object;
});

function _Json_addEntry(func)
{
	return F2(function(entry, array)
	{
		array.push(_Json_unwrap(func(entry)));
		return array;
	});
}

var _Json_encodeNull = _Json_wrap(null);



// TASKS

function _Scheduler_succeed(value)
{
	return {
		$: 0,
		a: value
	};
}

function _Scheduler_fail(error)
{
	return {
		$: 1,
		a: error
	};
}

function _Scheduler_binding(callback)
{
	return {
		$: 2,
		b: callback,
		c: null
	};
}

var _Scheduler_andThen = F2(function(callback, task)
{
	return {
		$: 3,
		b: callback,
		d: task
	};
});

var _Scheduler_onError = F2(function(callback, task)
{
	return {
		$: 4,
		b: callback,
		d: task
	};
});

function _Scheduler_receive(callback)
{
	return {
		$: 5,
		b: callback
	};
}


// PROCESSES

var _Scheduler_guid = 0;

function _Scheduler_rawSpawn(task)
{
	var proc = {
		$: 0,
		e: _Scheduler_guid++,
		f: task,
		g: null,
		h: []
	};

	_Scheduler_enqueue(proc);

	return proc;
}

function _Scheduler_spawn(task)
{
	return _Scheduler_binding(function(callback) {
		callback(_Scheduler_succeed(_Scheduler_rawSpawn(task)));
	});
}

function _Scheduler_rawSend(proc, msg)
{
	proc.h.push(msg);
	_Scheduler_enqueue(proc);
}

var _Scheduler_send = F2(function(proc, msg)
{
	return _Scheduler_binding(function(callback) {
		_Scheduler_rawSend(proc, msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});

function _Scheduler_kill(proc)
{
	return _Scheduler_binding(function(callback) {
		var task = proc.f;
		if (task.$ === 2 && task.c)
		{
			task.c();
		}

		proc.f = null;

		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
}


/* STEP PROCESSES

type alias Process =
  { $ : tag
  , id : unique_id
  , root : Task
  , stack : null | { $: SUCCEED | FAIL, a: callback, b: stack }
  , mailbox : [msg]
  }

*/


var _Scheduler_working = false;
var _Scheduler_queue = [];


function _Scheduler_enqueue(proc)
{
	_Scheduler_queue.push(proc);
	if (_Scheduler_working)
	{
		return;
	}
	_Scheduler_working = true;
	while (proc = _Scheduler_queue.shift())
	{
		_Scheduler_step(proc);
	}
	_Scheduler_working = false;
}


function _Scheduler_step(proc)
{
	while (proc.f)
	{
		var rootTag = proc.f.$;
		if (rootTag === 0 || rootTag === 1)
		{
			while (proc.g && proc.g.$ !== rootTag)
			{
				proc.g = proc.g.i;
			}
			if (!proc.g)
			{
				return;
			}
			proc.f = proc.g.b(proc.f.a);
			proc.g = proc.g.i;
		}
		else if (rootTag === 2)
		{
			proc.f.c = proc.f.b(function(newRoot) {
				proc.f = newRoot;
				_Scheduler_enqueue(proc);
			});
			return;
		}
		else if (rootTag === 5)
		{
			if (proc.h.length === 0)
			{
				return;
			}
			proc.f = proc.f.b(proc.h.shift());
		}
		else // if (rootTag === 3 || rootTag === 4)
		{
			proc.g = {
				$: rootTag === 3 ? 0 : 1,
				b: proc.f.b,
				i: proc.g
			};
			proc.f = proc.f.d;
		}
	}
}



function _Process_sleep(time)
{
	return _Scheduler_binding(function(callback) {
		var id = setTimeout(function() {
			callback(_Scheduler_succeed(_Utils_Tuple0));
		}, time);

		return function() { clearTimeout(id); };
	});
}




// PROGRAMS


var _Platform_worker = F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.dk,
		impl.eh,
		impl.eb,
		function() { return function() {} }
	);
});



// INITIALIZE A PROGRAM


function _Platform_initialize(flagDecoder, args, init, update, subscriptions, stepperBuilder)
{
	var result = A2(_Json_run, flagDecoder, _Json_wrap(args ? args['flags'] : undefined));
	$elm$core$Result$isOk(result) || _Debug_crash(2 /**_UNUSED/, _Json_errorToString(result.a) /**/);
	var managers = {};
	var initPair = init(result.a);
	var model = initPair.a;
	var stepper = stepperBuilder(sendToApp, model);
	var ports = _Platform_setupEffects(managers, sendToApp);

	function sendToApp(msg, viewMetadata)
	{
		var pair = A2(update, msg, model);
		stepper(model = pair.a, viewMetadata);
		_Platform_enqueueEffects(managers, pair.b, subscriptions(model));
	}

	_Platform_enqueueEffects(managers, initPair.b, subscriptions(model));

	return ports ? { ports: ports } : {};
}



// TRACK PRELOADS
//
// This is used by code in elm/browser and elm/http
// to register any HTTP requests that are triggered by init.
//


var _Platform_preload;


function _Platform_registerPreload(url)
{
	_Platform_preload.add(url);
}



// EFFECT MANAGERS


var _Platform_effectManagers = {};


function _Platform_setupEffects(managers, sendToApp)
{
	var ports;

	// setup all necessary effect managers
	for (var key in _Platform_effectManagers)
	{
		var manager = _Platform_effectManagers[key];

		if (manager.a)
		{
			ports = ports || {};
			ports[key] = manager.a(key, sendToApp);
		}

		managers[key] = _Platform_instantiateManager(manager, sendToApp);
	}

	return ports;
}


function _Platform_createManager(init, onEffects, onSelfMsg, cmdMap, subMap)
{
	return {
		b: init,
		c: onEffects,
		d: onSelfMsg,
		e: cmdMap,
		f: subMap
	};
}


function _Platform_instantiateManager(info, sendToApp)
{
	var router = {
		g: sendToApp,
		h: undefined
	};

	var onEffects = info.c;
	var onSelfMsg = info.d;
	var cmdMap = info.e;
	var subMap = info.f;

	function loop(state)
	{
		return A2(_Scheduler_andThen, loop, _Scheduler_receive(function(msg)
		{
			var value = msg.a;

			if (msg.$ === 0)
			{
				return A3(onSelfMsg, router, value, state);
			}

			return cmdMap && subMap
				? A4(onEffects, router, value.i, value.j, state)
				: A3(onEffects, router, cmdMap ? value.i : value.j, state);
		}));
	}

	return router.h = _Scheduler_rawSpawn(A2(_Scheduler_andThen, loop, info.b));
}



// ROUTING


var _Platform_sendToApp = F2(function(router, msg)
{
	return _Scheduler_binding(function(callback)
	{
		router.g(msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});


var _Platform_sendToSelf = F2(function(router, msg)
{
	return A2(_Scheduler_send, router.h, {
		$: 0,
		a: msg
	});
});



// BAGS


function _Platform_leaf(home)
{
	return function(value)
	{
		return {
			$: 1,
			k: home,
			l: value
		};
	};
}


function _Platform_batch(list)
{
	return {
		$: 2,
		m: list
	};
}


var _Platform_map = F2(function(tagger, bag)
{
	return {
		$: 3,
		n: tagger,
		o: bag
	}
});



// PIPE BAGS INTO EFFECT MANAGERS
//
// Effects must be queued!
//
// Say your init contains a synchronous command, like Time.now or Time.here
//
//   - This will produce a batch of effects (FX_1)
//   - The synchronous task triggers the subsequent `update` call
//   - This will produce a batch of effects (FX_2)
//
// If we just start dispatching FX_2, subscriptions from FX_2 can be processed
// before subscriptions from FX_1. No good! Earlier versions of this code had
// this problem, leading to these reports:
//
//   https://github.com/elm/core/issues/980
//   https://github.com/elm/core/pull/981
//   https://github.com/elm/compiler/issues/1776
//
// The queue is necessary to avoid ordering issues for synchronous commands.


// Why use true/false here? Why not just check the length of the queue?
// The goal is to detect "are we currently dispatching effects?" If we
// are, we need to bail and let the ongoing while loop handle things.
//
// Now say the queue has 1 element. When we dequeue the final element,
// the queue will be empty, but we are still actively dispatching effects.
// So you could get queue jumping in a really tricky category of cases.
//
var _Platform_effectsQueue = [];
var _Platform_effectsActive = false;


function _Platform_enqueueEffects(managers, cmdBag, subBag)
{
	_Platform_effectsQueue.push({ p: managers, q: cmdBag, r: subBag });

	if (_Platform_effectsActive) return;

	_Platform_effectsActive = true;
	for (var fx; fx = _Platform_effectsQueue.shift(); )
	{
		_Platform_dispatchEffects(fx.p, fx.q, fx.r);
	}
	_Platform_effectsActive = false;
}


function _Platform_dispatchEffects(managers, cmdBag, subBag)
{
	var effectsDict = {};
	_Platform_gatherEffects(true, cmdBag, effectsDict, null);
	_Platform_gatherEffects(false, subBag, effectsDict, null);

	for (var home in managers)
	{
		_Scheduler_rawSend(managers[home], {
			$: 'fx',
			a: effectsDict[home] || { i: _List_Nil, j: _List_Nil }
		});
	}
}


function _Platform_gatherEffects(isCmd, bag, effectsDict, taggers)
{
	switch (bag.$)
	{
		case 1:
			var home = bag.k;
			var effect = _Platform_toEffect(isCmd, home, taggers, bag.l);
			effectsDict[home] = _Platform_insert(isCmd, effect, effectsDict[home]);
			return;

		case 2:
			for (var list = bag.m; list.b; list = list.b) // WHILE_CONS
			{
				_Platform_gatherEffects(isCmd, list.a, effectsDict, taggers);
			}
			return;

		case 3:
			_Platform_gatherEffects(isCmd, bag.o, effectsDict, {
				s: bag.n,
				t: taggers
			});
			return;
	}
}


function _Platform_toEffect(isCmd, home, taggers, value)
{
	function applyTaggers(x)
	{
		for (var temp = taggers; temp; temp = temp.t)
		{
			x = temp.s(x);
		}
		return x;
	}

	var map = isCmd
		? _Platform_effectManagers[home].e
		: _Platform_effectManagers[home].f;

	return A2(map, applyTaggers, value)
}


function _Platform_insert(isCmd, newEffect, effects)
{
	effects = effects || { i: _List_Nil, j: _List_Nil };

	isCmd
		? (effects.i = _List_Cons(newEffect, effects.i))
		: (effects.j = _List_Cons(newEffect, effects.j));

	return effects;
}



// PORTS


function _Platform_checkPortName(name)
{
	if (_Platform_effectManagers[name])
	{
		_Debug_crash(3, name)
	}
}



// OUTGOING PORTS


function _Platform_outgoingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		e: _Platform_outgoingPortMap,
		u: converter,
		a: _Platform_setupOutgoingPort
	};
	return _Platform_leaf(name);
}


var _Platform_outgoingPortMap = F2(function(tagger, value) { return value; });


function _Platform_setupOutgoingPort(name)
{
	var subs = [];
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Process_sleep(0);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, cmdList, state)
	{
		for ( ; cmdList.b; cmdList = cmdList.b) // WHILE_CONS
		{
			// grab a separate reference to subs in case unsubscribe is called
			var currentSubs = subs;
			var value = _Json_unwrap(converter(cmdList.a));
			for (var i = 0; i < currentSubs.length; i++)
			{
				currentSubs[i](value);
			}
		}
		return init;
	});

	// PUBLIC API

	function subscribe(callback)
	{
		subs.push(callback);
	}

	function unsubscribe(callback)
	{
		// copy subs into a new array in case unsubscribe is called within a
		// subscribed callback
		subs = subs.slice();
		var index = subs.indexOf(callback);
		if (index >= 0)
		{
			subs.splice(index, 1);
		}
	}

	return {
		subscribe: subscribe,
		unsubscribe: unsubscribe
	};
}



// INCOMING PORTS


function _Platform_incomingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		f: _Platform_incomingPortMap,
		u: converter,
		a: _Platform_setupIncomingPort
	};
	return _Platform_leaf(name);
}


var _Platform_incomingPortMap = F2(function(tagger, finalTagger)
{
	return function(value)
	{
		return tagger(finalTagger(value));
	};
});


function _Platform_setupIncomingPort(name, sendToApp)
{
	var subs = _List_Nil;
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Scheduler_succeed(null);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, subList, state)
	{
		subs = subList;
		return init;
	});

	// PUBLIC API

	function send(incomingValue)
	{
		var result = A2(_Json_run, converter, _Json_wrap(incomingValue));

		$elm$core$Result$isOk(result) || _Debug_crash(4, name, result.a);

		var value = result.a;
		for (var temp = subs; temp.b; temp = temp.b) // WHILE_CONS
		{
			sendToApp(temp.a(value));
		}
	}

	return { send: send };
}



// EXPORT ELM MODULES
//
// Have DEBUG and PROD versions so that we can (1) give nicer errors in
// debug mode and (2) not pay for the bits needed for that in prod mode.
//


/*
function _Platform_export(exports)
{
	scope['Elm']
		? _Platform_mergeExportsProd(scope['Elm'], exports)
		: scope['Elm'] = exports;
}

*/

/*
function _Platform_mergeExportsProd(obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6)
				: _Platform_mergeExportsProd(obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}
*/


/*
function _Platform_export_UNUSED(exports)
{
	scope['Elm']
		? _Platform_mergeExportsDebug('Elm', scope['Elm'], exports)
		: scope['Elm'] = exports;
}

*/

/*
function _Platform_mergeExportsDebug(moduleName, obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6, moduleName)
				: _Platform_mergeExportsDebug(moduleName + '.' + name, obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}
*/




// HELPERS


var _VirtualDom_divertHrefToApp;

var _VirtualDom_doc = typeof document !== 'undefined' ? document : {};


function _VirtualDom_appendChild(parent, child)
{
	parent.appendChild(child);
}

var _VirtualDom_init = F4(function(virtualNode, flagDecoder, debugMetadata, args)
{
	// NOTE: this function needs _Platform_export available to work

	/**/
	var node = args['node'];
	//*/
	/**_UNUSED/
	var node = args && args['node'] ? args['node'] : _Debug_crash(0);
	//*/

	node.parentNode.replaceChild(
		_VirtualDom_render(virtualNode, function() {}),
		node
	);

	return {};
});



// TEXT


function _VirtualDom_text(string)
{
	return {
		$: 0,
		a: string
	};
}



// NODE


var _VirtualDom_nodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 1,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_node = _VirtualDom_nodeNS(undefined);



// KEYED NODE


var _VirtualDom_keyedNodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 2,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_keyedNode = _VirtualDom_keyedNodeNS(undefined);



// CUSTOM


function _VirtualDom_custom(factList, model, render, diff)
{
	return {
		$: 3,
		d: _VirtualDom_organizeFacts(factList),
		g: model,
		h: render,
		i: diff
	};
}



// MAP


var _VirtualDom_map = F2(function(tagger, node)
{
	return {
		$: 4,
		j: tagger,
		k: node,
		b: 1 + (node.b || 0)
	};
});



// LAZY


function _VirtualDom_thunk(refs, thunk)
{
	return {
		$: 5,
		l: refs,
		m: thunk,
		k: undefined
	};
}

var _VirtualDom_lazy = F2(function(func, a)
{
	return _VirtualDom_thunk([func, a], function() {
		return func(a);
	});
});

var _VirtualDom_lazy2 = F3(function(func, a, b)
{
	return _VirtualDom_thunk([func, a, b], function() {
		return A2(func, a, b);
	});
});

var _VirtualDom_lazy3 = F4(function(func, a, b, c)
{
	return _VirtualDom_thunk([func, a, b, c], function() {
		return A3(func, a, b, c);
	});
});

var _VirtualDom_lazy4 = F5(function(func, a, b, c, d)
{
	return _VirtualDom_thunk([func, a, b, c, d], function() {
		return A4(func, a, b, c, d);
	});
});

var _VirtualDom_lazy5 = F6(function(func, a, b, c, d, e)
{
	return _VirtualDom_thunk([func, a, b, c, d, e], function() {
		return A5(func, a, b, c, d, e);
	});
});

var _VirtualDom_lazy6 = F7(function(func, a, b, c, d, e, f)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f], function() {
		return A6(func, a, b, c, d, e, f);
	});
});

var _VirtualDom_lazy7 = F8(function(func, a, b, c, d, e, f, g)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g], function() {
		return A7(func, a, b, c, d, e, f, g);
	});
});

var _VirtualDom_lazy8 = F9(function(func, a, b, c, d, e, f, g, h)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g, h], function() {
		return A8(func, a, b, c, d, e, f, g, h);
	});
});



// FACTS


var _VirtualDom_on = F2(function(key, handler)
{
	return {
		$: 'a0',
		n: key,
		o: handler
	};
});
var _VirtualDom_style = F2(function(key, value)
{
	return {
		$: 'a1',
		n: key,
		o: value
	};
});
var _VirtualDom_property = F2(function(key, value)
{
	return {
		$: 'a2',
		n: key,
		o: value
	};
});
var _VirtualDom_attribute = F2(function(key, value)
{
	return {
		$: 'a3',
		n: key,
		o: value
	};
});
var _VirtualDom_attributeNS = F3(function(namespace, key, value)
{
	return {
		$: 'a4',
		n: key,
		o: { f: namespace, o: value }
	};
});



// XSS ATTACK VECTOR CHECKS
//
// For some reason, tabs can appear in href protocols and it still works.
// So '\tjava\tSCRIPT:alert("!!!")' and 'javascript:alert("!!!")' are the same
// in practice. That is why _VirtualDom_RE_js and _VirtualDom_RE_js_html look
// so freaky.
//
// Pulling the regular expressions out to the top level gives a slight speed
// boost in small benchmarks (4-10%) but hoisting values to reduce allocation
// can be unpredictable in large programs where JIT may have a harder time with
// functions are not fully self-contained. The benefit is more that the js and
// js_html ones are so weird that I prefer to see them near each other.


var _VirtualDom_RE_script = /^script$/i;
var _VirtualDom_RE_on_formAction = /^(on|formAction$)/i;
var _VirtualDom_RE_js = /^\s*j\s*a\s*v\s*a\s*s\s*c\s*r\s*i\s*p\s*t\s*:/i;
var _VirtualDom_RE_js_html = /^\s*(j\s*a\s*v\s*a\s*s\s*c\s*r\s*i\s*p\s*t\s*:|d\s*a\s*t\s*a\s*:\s*t\s*e\s*x\s*t\s*\/\s*h\s*t\s*m\s*l\s*(,|;))/i;


function _VirtualDom_noScript(tag)
{
	return _VirtualDom_RE_script.test(tag) ? 'p' : tag;
}

function _VirtualDom_noOnOrFormAction(key)
{
	return _VirtualDom_RE_on_formAction.test(key) ? 'data-' + key : key;
}

function _VirtualDom_noInnerHtmlOrFormAction(key)
{
	return key == 'innerHTML' || key == 'formAction' ? 'data-' + key : key;
}

function _VirtualDom_noJavaScriptUri(value)
{
	return _VirtualDom_RE_js.test(value)
		? /**/''//*//**_UNUSED/'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'//*/
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlUri(value)
{
	return _VirtualDom_RE_js_html.test(value)
		? /**/''//*//**_UNUSED/'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'//*/
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlJson(value)
{
	return (typeof _Json_unwrap(value) === 'string' && _VirtualDom_RE_js_html.test(_Json_unwrap(value)))
		? _Json_wrap(
			/**/''//*//**_UNUSED/'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'//*/
		) : value;
}



// MAP FACTS


var _VirtualDom_mapAttribute = F2(function(func, attr)
{
	return (attr.$ === 'a0')
		? A2(_VirtualDom_on, attr.n, _VirtualDom_mapHandler(func, attr.o))
		: attr;
});

function _VirtualDom_mapHandler(func, handler)
{
	var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

	// 0 = Normal
	// 1 = MayStopPropagation
	// 2 = MayPreventDefault
	// 3 = Custom

	return {
		$: handler.$,
		a:
			!tag
				? A2($elm$json$Json$Decode$map, func, handler.a)
				:
			A3($elm$json$Json$Decode$map2,
				tag < 3
					? _VirtualDom_mapEventTuple
					: _VirtualDom_mapEventRecord,
				$elm$json$Json$Decode$succeed(func),
				handler.a
			)
	};
}

var _VirtualDom_mapEventTuple = F2(function(func, tuple)
{
	return _Utils_Tuple2(func(tuple.a), tuple.b);
});

var _VirtualDom_mapEventRecord = F2(function(func, record)
{
	return {
		X: func(record.X),
		ab: record.ab,
		aa: record.aa
	}
});



// ORGANIZE FACTS


function _VirtualDom_organizeFacts(factList)
{
	for (var facts = {}; factList.b; factList = factList.b) // WHILE_CONS
	{
		var entry = factList.a;

		var tag = entry.$;
		var key = entry.n;
		var value = entry.o;

		if (tag === 'a2')
		{
			(key === 'className')
				? _VirtualDom_addClass(facts, key, _Json_unwrap(value))
				: facts[key] = _Json_unwrap(value);

			continue;
		}

		var subFacts = facts[tag] || (facts[tag] = {});
		(tag === 'a3' && key === 'class')
			? _VirtualDom_addClass(subFacts, key, value)
			: subFacts[key] = value;
	}

	return facts;
}

function _VirtualDom_addClass(object, key, newClass)
{
	var classes = object[key];
	object[key] = classes ? classes + ' ' + newClass : newClass;
}



// RENDER


function _VirtualDom_render(vNode, eventNode)
{
	var tag = vNode.$;

	if (tag === 5)
	{
		return _VirtualDom_render(vNode.k || (vNode.k = vNode.m()), eventNode);
	}

	if (tag === 0)
	{
		return _VirtualDom_doc.createTextNode(vNode.a);
	}

	if (tag === 4)
	{
		var subNode = vNode.k;
		var tagger = vNode.j;

		while (subNode.$ === 4)
		{
			typeof tagger !== 'object'
				? tagger = [tagger, subNode.j]
				: tagger.push(subNode.j);

			subNode = subNode.k;
		}

		var subEventRoot = { j: tagger, p: eventNode };
		var domNode = _VirtualDom_render(subNode, subEventRoot);
		domNode.elm_event_node_ref = subEventRoot;
		return domNode;
	}

	if (tag === 3)
	{
		var domNode = vNode.h(vNode.g);
		_VirtualDom_applyFacts(domNode, eventNode, vNode.d);
		return domNode;
	}

	// at this point `tag` must be 1 or 2

	var domNode = vNode.f
		? _VirtualDom_doc.createElementNS(vNode.f, vNode.c)
		: _VirtualDom_doc.createElement(vNode.c);

	if (_VirtualDom_divertHrefToApp && vNode.c == 'a')
	{
		domNode.addEventListener('click', _VirtualDom_divertHrefToApp(domNode));
	}

	_VirtualDom_applyFacts(domNode, eventNode, vNode.d);

	for (var kids = vNode.e, i = 0; i < kids.length; i++)
	{
		_VirtualDom_appendChild(domNode, _VirtualDom_render(tag === 1 ? kids[i] : kids[i].b, eventNode));
	}

	return domNode;
}



// APPLY FACTS


function _VirtualDom_applyFacts(domNode, eventNode, facts)
{
	for (var key in facts)
	{
		var value = facts[key];

		key === 'a1'
			? _VirtualDom_applyStyles(domNode, value)
			:
		key === 'a0'
			? _VirtualDom_applyEvents(domNode, eventNode, value)
			:
		key === 'a3'
			? _VirtualDom_applyAttrs(domNode, value)
			:
		key === 'a4'
			? _VirtualDom_applyAttrsNS(domNode, value)
			:
		((key !== 'value' && key !== 'checked') || domNode[key] !== value) && (domNode[key] = value);
	}
}



// APPLY STYLES


function _VirtualDom_applyStyles(domNode, styles)
{
	var domNodeStyle = domNode.style;

	for (var key in styles)
	{
		domNodeStyle[key] = styles[key];
	}
}



// APPLY ATTRS


function _VirtualDom_applyAttrs(domNode, attrs)
{
	for (var key in attrs)
	{
		var value = attrs[key];
		typeof value !== 'undefined'
			? domNode.setAttribute(key, value)
			: domNode.removeAttribute(key);
	}
}



// APPLY NAMESPACED ATTRS


function _VirtualDom_applyAttrsNS(domNode, nsAttrs)
{
	for (var key in nsAttrs)
	{
		var pair = nsAttrs[key];
		var namespace = pair.f;
		var value = pair.o;

		typeof value !== 'undefined'
			? domNode.setAttributeNS(namespace, key, value)
			: domNode.removeAttributeNS(namespace, key);
	}
}



// APPLY EVENTS


function _VirtualDom_applyEvents(domNode, eventNode, events)
{
	var allCallbacks = domNode.elmFs || (domNode.elmFs = {});

	for (var key in events)
	{
		var newHandler = events[key];
		var oldCallback = allCallbacks[key];

		if (!newHandler)
		{
			domNode.removeEventListener(key, oldCallback);
			allCallbacks[key] = undefined;
			continue;
		}

		if (oldCallback)
		{
			var oldHandler = oldCallback.q;
			if (oldHandler.$ === newHandler.$)
			{
				oldCallback.q = newHandler;
				continue;
			}
			domNode.removeEventListener(key, oldCallback);
		}

		oldCallback = _VirtualDom_makeCallback(eventNode, newHandler);
		domNode.addEventListener(key, oldCallback,
			_VirtualDom_passiveSupported
			&& { passive: $elm$virtual_dom$VirtualDom$toHandlerInt(newHandler) < 2 }
		);
		allCallbacks[key] = oldCallback;
	}
}



// PASSIVE EVENTS


var _VirtualDom_passiveSupported;

try
{
	window.addEventListener('t', null, Object.defineProperty({}, 'passive', {
		get: function() { _VirtualDom_passiveSupported = true; }
	}));
}
catch(e) {}



// EVENT HANDLERS


function _VirtualDom_makeCallback(eventNode, initialHandler)
{
	function callback(event)
	{
		var handler = callback.q;
		var result = _Json_runHelp(handler.a, event);

		if (!$elm$core$Result$isOk(result))
		{
			return;
		}

		var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

		// 0 = Normal
		// 1 = MayStopPropagation
		// 2 = MayPreventDefault
		// 3 = Custom

		var value = result.a;
		var message = !tag ? value : tag < 3 ? value.a : value.X;
		var stopPropagation = tag == 1 ? value.b : tag == 3 && value.ab;
		var currentEventNode = (
			stopPropagation && event.stopPropagation(),
			(tag == 2 ? value.b : tag == 3 && value.aa) && event.preventDefault(),
			eventNode
		);
		var tagger;
		var i;
		while (tagger = currentEventNode.j)
		{
			if (typeof tagger == 'function')
			{
				message = tagger(message);
			}
			else
			{
				for (var i = tagger.length; i--; )
				{
					message = tagger[i](message);
				}
			}
			currentEventNode = currentEventNode.p;
		}
		currentEventNode(message, stopPropagation); // stopPropagation implies isSync
	}

	callback.q = initialHandler;

	return callback;
}

function _VirtualDom_equalEvents(x, y)
{
	return x.$ == y.$ && _Json_equality(x.a, y.a);
}



// DIFF


// TODO: Should we do patches like in iOS?
//
// type Patch
//   = At Int Patch
//   | Batch (List Patch)
//   | Change ...
//
// How could it not be better?
//
function _VirtualDom_diff(x, y)
{
	var patches = [];
	_VirtualDom_diffHelp(x, y, patches, 0);
	return patches;
}


function _VirtualDom_pushPatch(patches, type, index, data)
{
	var patch = {
		$: type,
		r: index,
		s: data,
		t: undefined,
		u: undefined
	};
	patches.push(patch);
	return patch;
}


function _VirtualDom_diffHelp(x, y, patches, index)
{
	if (x === y)
	{
		return;
	}

	var xType = x.$;
	var yType = y.$;

	// Bail if you run into different types of nodes. Implies that the
	// structure has changed significantly and it's not worth a diff.
	if (xType !== yType)
	{
		if (xType === 1 && yType === 2)
		{
			y = _VirtualDom_dekey(y);
			yType = 1;
		}
		else
		{
			_VirtualDom_pushPatch(patches, 0, index, y);
			return;
		}
	}

	// Now we know that both nodes are the same $.
	switch (yType)
	{
		case 5:
			var xRefs = x.l;
			var yRefs = y.l;
			var i = xRefs.length;
			var same = i === yRefs.length;
			while (same && i--)
			{
				same = xRefs[i] === yRefs[i];
			}
			if (same)
			{
				y.k = x.k;
				return;
			}
			y.k = y.m();
			var subPatches = [];
			_VirtualDom_diffHelp(x.k, y.k, subPatches, 0);
			subPatches.length > 0 && _VirtualDom_pushPatch(patches, 1, index, subPatches);
			return;

		case 4:
			// gather nested taggers
			var xTaggers = x.j;
			var yTaggers = y.j;
			var nesting = false;

			var xSubNode = x.k;
			while (xSubNode.$ === 4)
			{
				nesting = true;

				typeof xTaggers !== 'object'
					? xTaggers = [xTaggers, xSubNode.j]
					: xTaggers.push(xSubNode.j);

				xSubNode = xSubNode.k;
			}

			var ySubNode = y.k;
			while (ySubNode.$ === 4)
			{
				nesting = true;

				typeof yTaggers !== 'object'
					? yTaggers = [yTaggers, ySubNode.j]
					: yTaggers.push(ySubNode.j);

				ySubNode = ySubNode.k;
			}

			// Just bail if different numbers of taggers. This implies the
			// structure of the virtual DOM has changed.
			if (nesting && xTaggers.length !== yTaggers.length)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			// check if taggers are "the same"
			if (nesting ? !_VirtualDom_pairwiseRefEqual(xTaggers, yTaggers) : xTaggers !== yTaggers)
			{
				_VirtualDom_pushPatch(patches, 2, index, yTaggers);
			}

			// diff everything below the taggers
			_VirtualDom_diffHelp(xSubNode, ySubNode, patches, index + 1);
			return;

		case 0:
			if (x.a !== y.a)
			{
				_VirtualDom_pushPatch(patches, 3, index, y.a);
			}
			return;

		case 1:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKids);
			return;

		case 2:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKeyedKids);
			return;

		case 3:
			if (x.h !== y.h)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
			factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

			var patch = y.i(x.g, y.g);
			patch && _VirtualDom_pushPatch(patches, 5, index, patch);

			return;
	}
}

// assumes the incoming arrays are the same length
function _VirtualDom_pairwiseRefEqual(as, bs)
{
	for (var i = 0; i < as.length; i++)
	{
		if (as[i] !== bs[i])
		{
			return false;
		}
	}

	return true;
}

function _VirtualDom_diffNodes(x, y, patches, index, diffKids)
{
	// Bail if obvious indicators have changed. Implies more serious
	// structural changes such that it's not worth it to diff.
	if (x.c !== y.c || x.f !== y.f)
	{
		_VirtualDom_pushPatch(patches, 0, index, y);
		return;
	}

	var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
	factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

	diffKids(x, y, patches, index);
}



// DIFF FACTS


// TODO Instead of creating a new diff object, it's possible to just test if
// there *is* a diff. During the actual patch, do the diff again and make the
// modifications directly. This way, there's no new allocations. Worth it?
function _VirtualDom_diffFacts(x, y, category)
{
	var diff;

	// look for changes and removals
	for (var xKey in x)
	{
		if (xKey === 'a1' || xKey === 'a0' || xKey === 'a3' || xKey === 'a4')
		{
			var subDiff = _VirtualDom_diffFacts(x[xKey], y[xKey] || {}, xKey);
			if (subDiff)
			{
				diff = diff || {};
				diff[xKey] = subDiff;
			}
			continue;
		}

		// remove if not in the new facts
		if (!(xKey in y))
		{
			diff = diff || {};
			diff[xKey] =
				!category
					? (typeof x[xKey] === 'string' ? '' : null)
					:
				(category === 'a1')
					? ''
					:
				(category === 'a0' || category === 'a3')
					? undefined
					:
				{ f: x[xKey].f, o: undefined };

			continue;
		}

		var xValue = x[xKey];
		var yValue = y[xKey];

		// reference equal, so don't worry about it
		if (xValue === yValue && xKey !== 'value' && xKey !== 'checked'
			|| category === 'a0' && _VirtualDom_equalEvents(xValue, yValue))
		{
			continue;
		}

		diff = diff || {};
		diff[xKey] = yValue;
	}

	// add new stuff
	for (var yKey in y)
	{
		if (!(yKey in x))
		{
			diff = diff || {};
			diff[yKey] = y[yKey];
		}
	}

	return diff;
}



// DIFF KIDS


function _VirtualDom_diffKids(xParent, yParent, patches, index)
{
	var xKids = xParent.e;
	var yKids = yParent.e;

	var xLen = xKids.length;
	var yLen = yKids.length;

	// FIGURE OUT IF THERE ARE INSERTS OR REMOVALS

	if (xLen > yLen)
	{
		_VirtualDom_pushPatch(patches, 6, index, {
			v: yLen,
			i: xLen - yLen
		});
	}
	else if (xLen < yLen)
	{
		_VirtualDom_pushPatch(patches, 7, index, {
			v: xLen,
			e: yKids
		});
	}

	// PAIRWISE DIFF EVERYTHING ELSE

	for (var minLen = xLen < yLen ? xLen : yLen, i = 0; i < minLen; i++)
	{
		var xKid = xKids[i];
		_VirtualDom_diffHelp(xKid, yKids[i], patches, ++index);
		index += xKid.b || 0;
	}
}



// KEYED DIFF


function _VirtualDom_diffKeyedKids(xParent, yParent, patches, rootIndex)
{
	var localPatches = [];

	var changes = {}; // Dict String Entry
	var inserts = []; // Array { index : Int, entry : Entry }
	// type Entry = { tag : String, vnode : VNode, index : Int, data : _ }

	var xKids = xParent.e;
	var yKids = yParent.e;
	var xLen = xKids.length;
	var yLen = yKids.length;
	var xIndex = 0;
	var yIndex = 0;

	var index = rootIndex;

	while (xIndex < xLen && yIndex < yLen)
	{
		var x = xKids[xIndex];
		var y = yKids[yIndex];

		var xKey = x.a;
		var yKey = y.a;
		var xNode = x.b;
		var yNode = y.b;

		var newMatch = undefined;
		var oldMatch = undefined;

		// check if keys match

		if (xKey === yKey)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNode, localPatches, index);
			index += xNode.b || 0;

			xIndex++;
			yIndex++;
			continue;
		}

		// look ahead 1 to detect insertions and removals.

		var xNext = xKids[xIndex + 1];
		var yNext = yKids[yIndex + 1];

		if (xNext)
		{
			var xNextKey = xNext.a;
			var xNextNode = xNext.b;
			oldMatch = yKey === xNextKey;
		}

		if (yNext)
		{
			var yNextKey = yNext.a;
			var yNextNode = yNext.b;
			newMatch = xKey === yNextKey;
		}


		// swap x and y
		if (newMatch && oldMatch)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			_VirtualDom_insertNode(changes, localPatches, xKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNextNode, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		// insert y
		if (newMatch)
		{
			index++;
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			index += xNode.b || 0;

			xIndex += 1;
			yIndex += 2;
			continue;
		}

		// remove x
		if (oldMatch)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 1;
			continue;
		}

		// remove x, insert y
		if (xNext && xNextKey === yNextKey)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNextNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		break;
	}

	// eat up any remaining nodes with removeNode and insertNode

	while (xIndex < xLen)
	{
		index++;
		var x = xKids[xIndex];
		var xNode = x.b;
		_VirtualDom_removeNode(changes, localPatches, x.a, xNode, index);
		index += xNode.b || 0;
		xIndex++;
	}

	while (yIndex < yLen)
	{
		var endInserts = endInserts || [];
		var y = yKids[yIndex];
		_VirtualDom_insertNode(changes, localPatches, y.a, y.b, undefined, endInserts);
		yIndex++;
	}

	if (localPatches.length > 0 || inserts.length > 0 || endInserts)
	{
		_VirtualDom_pushPatch(patches, 8, rootIndex, {
			w: localPatches,
			x: inserts,
			y: endInserts
		});
	}
}



// CHANGES FROM KEYED DIFF


var _VirtualDom_POSTFIX = '_elmW6BL';


function _VirtualDom_insertNode(changes, localPatches, key, vnode, yIndex, inserts)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		entry = {
			c: 0,
			z: vnode,
			r: yIndex,
			s: undefined
		};

		inserts.push({ r: yIndex, A: entry });
		changes[key] = entry;

		return;
	}

	// this key was removed earlier, a match!
	if (entry.c === 1)
	{
		inserts.push({ r: yIndex, A: entry });

		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(entry.z, vnode, subPatches, entry.r);
		entry.r = yIndex;
		entry.s.s = {
			w: subPatches,
			A: entry
		};

		return;
	}

	// this key has already been inserted or moved, a duplicate!
	_VirtualDom_insertNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, yIndex, inserts);
}


function _VirtualDom_removeNode(changes, localPatches, key, vnode, index)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		var patch = _VirtualDom_pushPatch(localPatches, 9, index, undefined);

		changes[key] = {
			c: 1,
			z: vnode,
			r: index,
			s: patch
		};

		return;
	}

	// this key was inserted earlier, a match!
	if (entry.c === 0)
	{
		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(vnode, entry.z, subPatches, index);

		_VirtualDom_pushPatch(localPatches, 9, index, {
			w: subPatches,
			A: entry
		});

		return;
	}

	// this key has already been removed or moved, a duplicate!
	_VirtualDom_removeNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, index);
}



// ADD DOM NODES
//
// Each DOM node has an "index" assigned in order of traversal. It is important
// to minimize our crawl over the actual DOM, so these indexes (along with the
// descendantsCount of virtual nodes) let us skip touching entire subtrees of
// the DOM if we know there are no patches there.


function _VirtualDom_addDomNodes(domNode, vNode, patches, eventNode)
{
	_VirtualDom_addDomNodesHelp(domNode, vNode, patches, 0, 0, vNode.b, eventNode);
}


// assumes `patches` is non-empty and indexes increase monotonically.
function _VirtualDom_addDomNodesHelp(domNode, vNode, patches, i, low, high, eventNode)
{
	var patch = patches[i];
	var index = patch.r;

	while (index === low)
	{
		var patchType = patch.$;

		if (patchType === 1)
		{
			_VirtualDom_addDomNodes(domNode, vNode.k, patch.s, eventNode);
		}
		else if (patchType === 8)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var subPatches = patch.s.w;
			if (subPatches.length > 0)
			{
				_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
			}
		}
		else if (patchType === 9)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var data = patch.s;
			if (data)
			{
				data.A.s = domNode;
				var subPatches = data.w;
				if (subPatches.length > 0)
				{
					_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
				}
			}
		}
		else
		{
			patch.t = domNode;
			patch.u = eventNode;
		}

		i++;

		if (!(patch = patches[i]) || (index = patch.r) > high)
		{
			return i;
		}
	}

	var tag = vNode.$;

	if (tag === 4)
	{
		var subNode = vNode.k;

		while (subNode.$ === 4)
		{
			subNode = subNode.k;
		}

		return _VirtualDom_addDomNodesHelp(domNode, subNode, patches, i, low + 1, high, domNode.elm_event_node_ref);
	}

	// tag must be 1 or 2 at this point

	var vKids = vNode.e;
	var childNodes = domNode.childNodes;
	for (var j = 0; j < vKids.length; j++)
	{
		low++;
		var vKid = tag === 1 ? vKids[j] : vKids[j].b;
		var nextLow = low + (vKid.b || 0);
		if (low <= index && index <= nextLow)
		{
			i = _VirtualDom_addDomNodesHelp(childNodes[j], vKid, patches, i, low, nextLow, eventNode);
			if (!(patch = patches[i]) || (index = patch.r) > high)
			{
				return i;
			}
		}
		low = nextLow;
	}
	return i;
}



// APPLY PATCHES


function _VirtualDom_applyPatches(rootDomNode, oldVirtualNode, patches, eventNode)
{
	if (patches.length === 0)
	{
		return rootDomNode;
	}

	_VirtualDom_addDomNodes(rootDomNode, oldVirtualNode, patches, eventNode);
	return _VirtualDom_applyPatchesHelp(rootDomNode, patches);
}

function _VirtualDom_applyPatchesHelp(rootDomNode, patches)
{
	for (var i = 0; i < patches.length; i++)
	{
		var patch = patches[i];
		var localDomNode = patch.t
		var newNode = _VirtualDom_applyPatch(localDomNode, patch);
		if (localDomNode === rootDomNode)
		{
			rootDomNode = newNode;
		}
	}
	return rootDomNode;
}

function _VirtualDom_applyPatch(domNode, patch)
{
	switch (patch.$)
	{
		case 0:
			return _VirtualDom_applyPatchRedraw(domNode, patch.s, patch.u);

		case 4:
			_VirtualDom_applyFacts(domNode, patch.u, patch.s);
			return domNode;

		case 3:
			domNode.replaceData(0, domNode.length, patch.s);
			return domNode;

		case 1:
			return _VirtualDom_applyPatchesHelp(domNode, patch.s);

		case 2:
			if (domNode.elm_event_node_ref)
			{
				domNode.elm_event_node_ref.j = patch.s;
			}
			else
			{
				domNode.elm_event_node_ref = { j: patch.s, p: patch.u };
			}
			return domNode;

		case 6:
			var data = patch.s;
			for (var i = 0; i < data.i; i++)
			{
				domNode.removeChild(domNode.childNodes[data.v]);
			}
			return domNode;

		case 7:
			var data = patch.s;
			var kids = data.e;
			var i = data.v;
			var theEnd = domNode.childNodes[i];
			for (; i < kids.length; i++)
			{
				domNode.insertBefore(_VirtualDom_render(kids[i], patch.u), theEnd);
			}
			return domNode;

		case 9:
			var data = patch.s;
			if (!data)
			{
				domNode.parentNode.removeChild(domNode);
				return domNode;
			}
			var entry = data.A;
			if (typeof entry.r !== 'undefined')
			{
				domNode.parentNode.removeChild(domNode);
			}
			entry.s = _VirtualDom_applyPatchesHelp(domNode, data.w);
			return domNode;

		case 8:
			return _VirtualDom_applyPatchReorder(domNode, patch);

		case 5:
			return patch.s(domNode);

		default:
			_Debug_crash(10); // 'Ran into an unknown patch!'
	}
}


function _VirtualDom_applyPatchRedraw(domNode, vNode, eventNode)
{
	var parentNode = domNode.parentNode;
	var newNode = _VirtualDom_render(vNode, eventNode);

	if (!newNode.elm_event_node_ref)
	{
		newNode.elm_event_node_ref = domNode.elm_event_node_ref;
	}

	if (parentNode && newNode !== domNode)
	{
		parentNode.replaceChild(newNode, domNode);
	}
	return newNode;
}


function _VirtualDom_applyPatchReorder(domNode, patch)
{
	var data = patch.s;

	// remove end inserts
	var frag = _VirtualDom_applyPatchReorderEndInsertsHelp(data.y, patch);

	// removals
	domNode = _VirtualDom_applyPatchesHelp(domNode, data.w);

	// inserts
	var inserts = data.x;
	for (var i = 0; i < inserts.length; i++)
	{
		var insert = inserts[i];
		var entry = insert.A;
		var node = entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u);
		domNode.insertBefore(node, domNode.childNodes[insert.r]);
	}

	// add end inserts
	if (frag)
	{
		_VirtualDom_appendChild(domNode, frag);
	}

	return domNode;
}


function _VirtualDom_applyPatchReorderEndInsertsHelp(endInserts, patch)
{
	if (!endInserts)
	{
		return;
	}

	var frag = _VirtualDom_doc.createDocumentFragment();
	for (var i = 0; i < endInserts.length; i++)
	{
		var insert = endInserts[i];
		var entry = insert.A;
		_VirtualDom_appendChild(frag, entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u)
		);
	}
	return frag;
}


function _VirtualDom_virtualize(node)
{
	// TEXT NODES

	if (node.nodeType === 3)
	{
		return _VirtualDom_text(node.textContent);
	}


	// WEIRD NODES

	if (node.nodeType !== 1)
	{
		return _VirtualDom_text('');
	}


	// ELEMENT NODES

	var attrList = _List_Nil;
	var attrs = node.attributes;
	for (var i = attrs.length; i--; )
	{
		var attr = attrs[i];
		var name = attr.name;
		var value = attr.value;
		attrList = _List_Cons( A2(_VirtualDom_attribute, name, value), attrList );
	}

	var tag = node.tagName.toLowerCase();
	var kidList = _List_Nil;
	var kids = node.childNodes;

	for (var i = kids.length; i--; )
	{
		kidList = _List_Cons(_VirtualDom_virtualize(kids[i]), kidList);
	}
	return A3(_VirtualDom_node, tag, attrList, kidList);
}

function _VirtualDom_dekey(keyedNode)
{
	var keyedKids = keyedNode.e;
	var len = keyedKids.length;
	var kids = new Array(len);
	for (var i = 0; i < len; i++)
	{
		kids[i] = keyedKids[i].b;
	}

	return {
		$: 1,
		c: keyedNode.c,
		d: keyedNode.d,
		e: kids,
		f: keyedNode.f,
		b: keyedNode.b
	};
}




// ELEMENT


var _Debugger_element;

var _Browser_element = _Debugger_element || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.dk,
		impl.eh,
		impl.eb,
		function(sendToApp, initialModel) {
			var view = impl.ej;
			/**/
			var domNode = args['node'];
			//*/
			/**_UNUSED/
			var domNode = args && args['node'] ? args['node'] : _Debug_crash(0);
			//*/
			var currNode = _VirtualDom_virtualize(domNode);

			return _Browser_makeAnimator(initialModel, function(model)
			{
				var nextNode = view(model);
				var patches = _VirtualDom_diff(currNode, nextNode);
				domNode = _VirtualDom_applyPatches(domNode, currNode, patches, sendToApp);
				currNode = nextNode;
			});
		}
	);
});



// DOCUMENT


var _Debugger_document;

var _Browser_document = _Debugger_document || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.dk,
		impl.eh,
		impl.eb,
		function(sendToApp, initialModel) {
			var divertHrefToApp = impl.bF && impl.bF(sendToApp)
			var view = impl.ej;
			var title = _VirtualDom_doc.title;
			var bodyNode = _VirtualDom_doc.body;
			var currNode = _VirtualDom_virtualize(bodyNode);
			return _Browser_makeAnimator(initialModel, function(model)
			{
				_VirtualDom_divertHrefToApp = divertHrefToApp;
				var doc = view(model);
				var nextNode = _VirtualDom_node('body')(_List_Nil)(doc.a9);
				var patches = _VirtualDom_diff(currNode, nextNode);
				bodyNode = _VirtualDom_applyPatches(bodyNode, currNode, patches, sendToApp);
				currNode = nextNode;
				_VirtualDom_divertHrefToApp = 0;
				(title !== doc.ee) && (_VirtualDom_doc.title = title = doc.ee);
			});
		}
	);
});



// ANIMATION


var _Browser_cancelAnimationFrame =
	typeof cancelAnimationFrame !== 'undefined'
		? cancelAnimationFrame
		: function(id) { clearTimeout(id); };

var _Browser_requestAnimationFrame =
	typeof requestAnimationFrame !== 'undefined'
		? requestAnimationFrame
		: function(callback) { return setTimeout(callback, 1000 / 60); };


function _Browser_makeAnimator(model, draw)
{
	draw(model);

	var state = 0;

	function updateIfNeeded()
	{
		state = state === 1
			? 0
			: ( _Browser_requestAnimationFrame(updateIfNeeded), draw(model), 1 );
	}

	return function(nextModel, isSync)
	{
		model = nextModel;

		isSync
			? ( draw(model),
				state === 2 && (state = 1)
				)
			: ( state === 0 && _Browser_requestAnimationFrame(updateIfNeeded),
				state = 2
				);
	};
}



// APPLICATION


function _Browser_application(impl)
{
	var onUrlChange = impl.Y;
	var onUrlRequest = impl.Z;
	var key = function() { key.a(onUrlChange(_Browser_getUrl())); };

	return _Browser_document({
		bF: function(sendToApp)
		{
			key.a = sendToApp;
			_Browser_window.addEventListener('popstate', key);
			_Browser_window.navigator.userAgent.indexOf('Trident') < 0 || _Browser_window.addEventListener('hashchange', key);

			return F2(function(domNode, event)
			{
				if (!event.ctrlKey && !event.metaKey && !event.shiftKey && event.button < 1 && !domNode.target && !domNode.hasAttribute('download'))
				{
					event.preventDefault();
					var href = domNode.href;
					var curr = _Browser_getUrl();
					var next = $elm$url$Url$fromString(href).a;
					sendToApp(onUrlRequest(
						(next
							&& curr.cs === next.cs
							&& curr.bl === next.bl
							&& curr.cm.a === next.cm.a
						)
							? $elm$browser$Browser$Internal(next)
							: $elm$browser$Browser$External(href)
					));
				}
			});
		},
		dk: function(flags)
		{
			return A3(impl.dk, flags, _Browser_getUrl(), key);
		},
		ej: impl.ej,
		eh: impl.eh,
		eb: impl.eb
	});
}

function _Browser_getUrl()
{
	return $elm$url$Url$fromString(_VirtualDom_doc.location.href).a || _Debug_crash(1);
}

var _Browser_go = F2(function(key, n)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		n && history.go(n);
		key();
	}));
});

var _Browser_pushUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.pushState({}, '', url);
		key();
	}));
});

var _Browser_replaceUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.replaceState({}, '', url);
		key();
	}));
});



// GLOBAL EVENTS


var _Browser_fakeNode = { addEventListener: function() {}, removeEventListener: function() {} };
var _Browser_doc = typeof document !== 'undefined' ? document : _Browser_fakeNode;
var _Browser_window = typeof window !== 'undefined' ? window : _Browser_fakeNode;

var _Browser_on = F3(function(node, eventName, sendToSelf)
{
	return _Scheduler_spawn(_Scheduler_binding(function(callback)
	{
		function handler(event)	{ _Scheduler_rawSpawn(sendToSelf(event)); }
		node.addEventListener(eventName, handler, _VirtualDom_passiveSupported && { passive: true });
		return function() { node.removeEventListener(eventName, handler); };
	}));
});

var _Browser_decodeEvent = F2(function(decoder, event)
{
	var result = _Json_runHelp(decoder, event);
	return $elm$core$Result$isOk(result) ? $elm$core$Maybe$Just(result.a) : $elm$core$Maybe$Nothing;
});



// PAGE VISIBILITY


function _Browser_visibilityInfo()
{
	return (typeof _VirtualDom_doc.hidden !== 'undefined')
		? { dg: 'hidden', cW: 'visibilitychange' }
		:
	(typeof _VirtualDom_doc.mozHidden !== 'undefined')
		? { dg: 'mozHidden', cW: 'mozvisibilitychange' }
		:
	(typeof _VirtualDom_doc.msHidden !== 'undefined')
		? { dg: 'msHidden', cW: 'msvisibilitychange' }
		:
	(typeof _VirtualDom_doc.webkitHidden !== 'undefined')
		? { dg: 'webkitHidden', cW: 'webkitvisibilitychange' }
		: { dg: 'hidden', cW: 'visibilitychange' };
}



// ANIMATION FRAMES


function _Browser_rAF()
{
	return _Scheduler_binding(function(callback)
	{
		var id = _Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(Date.now()));
		});

		return function() {
			_Browser_cancelAnimationFrame(id);
		};
	});
}


function _Browser_now()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(Date.now()));
	});
}



// DOM STUFF


function _Browser_withNode(id, doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			var node = document.getElementById(id);
			callback(node
				? _Scheduler_succeed(doStuff(node))
				: _Scheduler_fail($elm$browser$Browser$Dom$NotFound(id))
			);
		});
	});
}


function _Browser_withWindow(doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(doStuff()));
		});
	});
}


// FOCUS and BLUR


var _Browser_call = F2(function(functionName, id)
{
	return _Browser_withNode(id, function(node) {
		node[functionName]();
		return _Utils_Tuple0;
	});
});



// WINDOW VIEWPORT


function _Browser_getViewport()
{
	return {
		cy: _Browser_getScene(),
		cJ: {
			cL: _Browser_window.pageXOffset,
			cM: _Browser_window.pageYOffset,
			ek: _Browser_doc.documentElement.clientWidth,
			df: _Browser_doc.documentElement.clientHeight
		}
	};
}

function _Browser_getScene()
{
	var body = _Browser_doc.body;
	var elem = _Browser_doc.documentElement;
	return {
		ek: Math.max(body.scrollWidth, body.offsetWidth, elem.scrollWidth, elem.offsetWidth, elem.clientWidth),
		df: Math.max(body.scrollHeight, body.offsetHeight, elem.scrollHeight, elem.offsetHeight, elem.clientHeight)
	};
}

var _Browser_setViewport = F2(function(x, y)
{
	return _Browser_withWindow(function()
	{
		_Browser_window.scroll(x, y);
		return _Utils_Tuple0;
	});
});



// ELEMENT VIEWPORT


function _Browser_getViewportOf(id)
{
	return _Browser_withNode(id, function(node)
	{
		return {
			cy: {
				ek: node.scrollWidth,
				df: node.scrollHeight
			},
			cJ: {
				cL: node.scrollLeft,
				cM: node.scrollTop,
				ek: node.clientWidth,
				df: node.clientHeight
			}
		};
	});
}


var _Browser_setViewportOf = F3(function(id, x, y)
{
	return _Browser_withNode(id, function(node)
	{
		node.scrollLeft = x;
		node.scrollTop = y;
		return _Utils_Tuple0;
	});
});



// ELEMENT


function _Browser_getElement(id)
{
	return _Browser_withNode(id, function(node)
	{
		var rect = node.getBoundingClientRect();
		var x = _Browser_window.pageXOffset;
		var y = _Browser_window.pageYOffset;
		return {
			cy: _Browser_getScene(),
			cJ: {
				cL: x,
				cM: y,
				ek: _Browser_doc.documentElement.clientWidth,
				df: _Browser_doc.documentElement.clientHeight
			},
			c4: {
				cL: x + rect.left,
				cM: y + rect.top,
				ek: rect.width,
				df: rect.height
			}
		};
	});
}



// LOAD and RELOAD


function _Browser_reload(skipCache)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		_VirtualDom_doc.location.reload(skipCache);
	}));
}

function _Browser_load(url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		try
		{
			_Browser_window.location = url;
		}
		catch(err)
		{
			// Only Firefox can throw a NS_ERROR_MALFORMED_URI exception here.
			// Other browsers reload the page, so let's be consistent about that.
			_VirtualDom_doc.location.reload(false);
		}
	}));
}


// CREATE

var _Regex_never = /.^/;

var _Regex_fromStringWith = F2(function(options, string)
{
	var flags = 'g';
	if (options.dE) { flags += 'm'; }
	if (options.cV) { flags += 'i'; }

	try
	{
		return $elm$core$Maybe$Just(new RegExp(string, flags));
	}
	catch(error)
	{
		return $elm$core$Maybe$Nothing;
	}
});


// USE

var _Regex_contains = F2(function(re, string)
{
	return string.match(re) !== null;
});


var _Regex_findAtMost = F3(function(n, re, str)
{
	var out = [];
	var number = 0;
	var string = str;
	var lastIndex = re.lastIndex;
	var prevLastIndex = -1;
	var result;
	while (number++ < n && (result = re.exec(string)))
	{
		if (prevLastIndex == re.lastIndex) break;
		var i = result.length - 1;
		var subs = new Array(i);
		while (i > 0)
		{
			var submatch = result[i];
			subs[--i] = submatch
				? $elm$core$Maybe$Just(submatch)
				: $elm$core$Maybe$Nothing;
		}
		out.push(A4($elm$regex$Regex$Match, result[0], result.index, number, _List_fromArray(subs)));
		prevLastIndex = re.lastIndex;
	}
	re.lastIndex = lastIndex;
	return _List_fromArray(out);
});


var _Regex_replaceAtMost = F4(function(n, re, replacer, string)
{
	var count = 0;
	function jsReplacer(match)
	{
		if (count++ >= n)
		{
			return match;
		}
		var i = arguments.length - 3;
		var submatches = new Array(i);
		while (i > 0)
		{
			var submatch = arguments[i];
			submatches[--i] = submatch
				? $elm$core$Maybe$Just(submatch)
				: $elm$core$Maybe$Nothing;
		}
		return replacer(A4($elm$regex$Regex$Match, match, arguments[arguments.length - 2], count, _List_fromArray(submatches)));
	}
	return string.replace(re, jsReplacer);
});

var _Regex_splitAtMost = F3(function(n, re, str)
{
	var string = str;
	var out = [];
	var start = re.lastIndex;
	var restoreLastIndex = re.lastIndex;
	while (n--)
	{
		var result = re.exec(string);
		if (!result) break;
		out.push(string.slice(start, result.index));
		start = re.lastIndex;
	}
	out.push(string.slice(start));
	re.lastIndex = restoreLastIndex;
	return _List_fromArray(out);
});

var _Regex_infinity = Infinity;


function _Url_percentEncode(string)
{
	return encodeURIComponent(string);
}

function _Url_percentDecode(string)
{
	try
	{
		return $elm$core$Maybe$Just(decodeURIComponent(string));
	}
	catch (e)
	{
		return $elm$core$Maybe$Nothing;
	}
}var $elm$core$Maybe$Just = function (a) {
	return {$: 0, a: a};
};
var $elm$core$Maybe$Nothing = {$: 1};
var $elm$core$List$cons = _List_cons;
var $elm$core$Elm$JsArray$foldr = _JsArray_foldr;
var $elm$core$Array$foldr = F3(
	function (func, baseCase, _v0) {
		var tree = _v0.c;
		var tail = _v0.d;
		var helper = F2(
			function (node, acc) {
				if (!node.$) {
					var subTree = node.a;
					return A3($elm$core$Elm$JsArray$foldr, helper, acc, subTree);
				} else {
					var values = node.a;
					return A3($elm$core$Elm$JsArray$foldr, func, acc, values);
				}
			});
		return A3(
			$elm$core$Elm$JsArray$foldr,
			helper,
			A3($elm$core$Elm$JsArray$foldr, func, baseCase, tail),
			tree);
	});
var $elm$core$Array$toList = function (array) {
	return A3($elm$core$Array$foldr, $elm$core$List$cons, _List_Nil, array);
};
var $elm$core$Dict$foldr = F3(
	function (func, acc, t) {
		foldr:
		while (true) {
			if (t.$ === -2) {
				return acc;
			} else {
				var key = t.b;
				var value = t.c;
				var left = t.d;
				var right = t.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldr, func, acc, right)),
					$temp$t = left;
				func = $temp$func;
				acc = $temp$acc;
				t = $temp$t;
				continue foldr;
			}
		}
	});
var $elm$core$Dict$toList = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, list) {
				return A2(
					$elm$core$List$cons,
					_Utils_Tuple2(key, value),
					list);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Dict$keys = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, keyList) {
				return A2($elm$core$List$cons, key, keyList);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Set$toList = function (_v0) {
	var dict = _v0;
	return $elm$core$Dict$keys(dict);
};
var $elm$core$Basics$EQ = 1;
var $elm$core$Basics$GT = 2;
var $elm$core$Basics$LT = 0;
var $elm$core$Result$Err = function (a) {
	return {$: 1, a: a};
};
var $elm$json$Json$Decode$Failure = F2(
	function (a, b) {
		return {$: 3, a: a, b: b};
	});
var $elm$json$Json$Decode$Field = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $elm$json$Json$Decode$Index = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var $elm$core$Result$Ok = function (a) {
	return {$: 0, a: a};
};
var $elm$json$Json$Decode$OneOf = function (a) {
	return {$: 2, a: a};
};
var $elm$core$Basics$False = 1;
var $elm$core$Basics$add = _Basics_add;
var $elm$core$String$all = _String_all;
var $elm$core$Basics$and = _Basics_and;
var $elm$core$Basics$append = _Utils_append;
var $elm$json$Json$Encode$encode = _Json_encode;
var $elm$core$String$fromInt = _String_fromNumber;
var $elm$core$String$join = F2(
	function (sep, chunks) {
		return A2(
			_String_join,
			sep,
			_List_toArray(chunks));
	});
var $elm$core$String$split = F2(
	function (sep, string) {
		return _List_fromArray(
			A2(_String_split, sep, string));
	});
var $elm$json$Json$Decode$indent = function (str) {
	return A2(
		$elm$core$String$join,
		'\n    ',
		A2($elm$core$String$split, '\n', str));
};
var $elm$core$List$foldl = F3(
	function (func, acc, list) {
		foldl:
		while (true) {
			if (!list.b) {
				return acc;
			} else {
				var x = list.a;
				var xs = list.b;
				var $temp$func = func,
					$temp$acc = A2(func, x, acc),
					$temp$list = xs;
				func = $temp$func;
				acc = $temp$acc;
				list = $temp$list;
				continue foldl;
			}
		}
	});
var $elm$core$List$length = function (xs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, i) {
				return i + 1;
			}),
		0,
		xs);
};
var $elm$core$List$map2 = _List_map2;
var $elm$core$Basics$le = _Utils_le;
var $elm$core$Basics$sub = _Basics_sub;
var $elm$core$List$rangeHelp = F3(
	function (lo, hi, list) {
		rangeHelp:
		while (true) {
			if (_Utils_cmp(lo, hi) < 1) {
				var $temp$lo = lo,
					$temp$hi = hi - 1,
					$temp$list = A2($elm$core$List$cons, hi, list);
				lo = $temp$lo;
				hi = $temp$hi;
				list = $temp$list;
				continue rangeHelp;
			} else {
				return list;
			}
		}
	});
var $elm$core$List$range = F2(
	function (lo, hi) {
		return A3($elm$core$List$rangeHelp, lo, hi, _List_Nil);
	});
var $elm$core$List$indexedMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$map2,
			f,
			A2(
				$elm$core$List$range,
				0,
				$elm$core$List$length(xs) - 1),
			xs);
	});
var $elm$core$Char$toCode = _Char_toCode;
var $elm$core$Char$isLower = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (97 <= code) && (code <= 122);
};
var $elm$core$Char$isUpper = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 90) && (65 <= code);
};
var $elm$core$Basics$or = _Basics_or;
var $elm$core$Char$isAlpha = function (_char) {
	return $elm$core$Char$isLower(_char) || $elm$core$Char$isUpper(_char);
};
var $elm$core$Char$isDigit = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 57) && (48 <= code);
};
var $elm$core$Char$isAlphaNum = function (_char) {
	return $elm$core$Char$isLower(_char) || ($elm$core$Char$isUpper(_char) || $elm$core$Char$isDigit(_char));
};
var $elm$core$List$reverse = function (list) {
	return A3($elm$core$List$foldl, $elm$core$List$cons, _List_Nil, list);
};
var $elm$core$String$uncons = _String_uncons;
var $elm$json$Json$Decode$errorOneOf = F2(
	function (i, error) {
		return '\n\n(' + ($elm$core$String$fromInt(i + 1) + (') ' + $elm$json$Json$Decode$indent(
			$elm$json$Json$Decode$errorToString(error))));
	});
var $elm$json$Json$Decode$errorToString = function (error) {
	return A2($elm$json$Json$Decode$errorToStringHelp, error, _List_Nil);
};
var $elm$json$Json$Decode$errorToStringHelp = F2(
	function (error, context) {
		errorToStringHelp:
		while (true) {
			switch (error.$) {
				case 0:
					var f = error.a;
					var err = error.b;
					var isSimple = function () {
						var _v1 = $elm$core$String$uncons(f);
						if (_v1.$ === 1) {
							return false;
						} else {
							var _v2 = _v1.a;
							var _char = _v2.a;
							var rest = _v2.b;
							return $elm$core$Char$isAlpha(_char) && A2($elm$core$String$all, $elm$core$Char$isAlphaNum, rest);
						}
					}();
					var fieldName = isSimple ? ('.' + f) : ('[\'' + (f + '\']'));
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, fieldName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 1:
					var i = error.a;
					var err = error.b;
					var indexName = '[' + ($elm$core$String$fromInt(i) + ']');
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, indexName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 2:
					var errors = error.a;
					if (!errors.b) {
						return 'Ran into a Json.Decode.oneOf with no possibilities' + function () {
							if (!context.b) {
								return '!';
							} else {
								return ' at json' + A2(
									$elm$core$String$join,
									'',
									$elm$core$List$reverse(context));
							}
						}();
					} else {
						if (!errors.b.b) {
							var err = errors.a;
							var $temp$error = err,
								$temp$context = context;
							error = $temp$error;
							context = $temp$context;
							continue errorToStringHelp;
						} else {
							var starter = function () {
								if (!context.b) {
									return 'Json.Decode.oneOf';
								} else {
									return 'The Json.Decode.oneOf at json' + A2(
										$elm$core$String$join,
										'',
										$elm$core$List$reverse(context));
								}
							}();
							var introduction = starter + (' failed in the following ' + ($elm$core$String$fromInt(
								$elm$core$List$length(errors)) + ' ways:'));
							return A2(
								$elm$core$String$join,
								'\n\n',
								A2(
									$elm$core$List$cons,
									introduction,
									A2($elm$core$List$indexedMap, $elm$json$Json$Decode$errorOneOf, errors)));
						}
					}
				default:
					var msg = error.a;
					var json = error.b;
					var introduction = function () {
						if (!context.b) {
							return 'Problem with the given value:\n\n';
						} else {
							return 'Problem with the value at json' + (A2(
								$elm$core$String$join,
								'',
								$elm$core$List$reverse(context)) + ':\n\n    ');
						}
					}();
					return introduction + ($elm$json$Json$Decode$indent(
						A2($elm$json$Json$Encode$encode, 4, json)) + ('\n\n' + msg));
			}
		}
	});
var $elm$core$Array$branchFactor = 32;
var $elm$core$Array$Array_elm_builtin = F4(
	function (a, b, c, d) {
		return {$: 0, a: a, b: b, c: c, d: d};
	});
var $elm$core$Elm$JsArray$empty = _JsArray_empty;
var $elm$core$Basics$ceiling = _Basics_ceiling;
var $elm$core$Basics$fdiv = _Basics_fdiv;
var $elm$core$Basics$logBase = F2(
	function (base, number) {
		return _Basics_log(number) / _Basics_log(base);
	});
var $elm$core$Basics$toFloat = _Basics_toFloat;
var $elm$core$Array$shiftStep = $elm$core$Basics$ceiling(
	A2($elm$core$Basics$logBase, 2, $elm$core$Array$branchFactor));
var $elm$core$Array$empty = A4($elm$core$Array$Array_elm_builtin, 0, $elm$core$Array$shiftStep, $elm$core$Elm$JsArray$empty, $elm$core$Elm$JsArray$empty);
var $elm$core$Elm$JsArray$initialize = _JsArray_initialize;
var $elm$core$Array$Leaf = function (a) {
	return {$: 1, a: a};
};
var $elm$core$Basics$apL = F2(
	function (f, x) {
		return f(x);
	});
var $elm$core$Basics$apR = F2(
	function (x, f) {
		return f(x);
	});
var $elm$core$Basics$eq = _Utils_equal;
var $elm$core$Basics$floor = _Basics_floor;
var $elm$core$Elm$JsArray$length = _JsArray_length;
var $elm$core$Basics$gt = _Utils_gt;
var $elm$core$Basics$max = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) > 0) ? x : y;
	});
var $elm$core$Basics$mul = _Basics_mul;
var $elm$core$Array$SubTree = function (a) {
	return {$: 0, a: a};
};
var $elm$core$Elm$JsArray$initializeFromList = _JsArray_initializeFromList;
var $elm$core$Array$compressNodes = F2(
	function (nodes, acc) {
		compressNodes:
		while (true) {
			var _v0 = A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodes);
			var node = _v0.a;
			var remainingNodes = _v0.b;
			var newAcc = A2(
				$elm$core$List$cons,
				$elm$core$Array$SubTree(node),
				acc);
			if (!remainingNodes.b) {
				return $elm$core$List$reverse(newAcc);
			} else {
				var $temp$nodes = remainingNodes,
					$temp$acc = newAcc;
				nodes = $temp$nodes;
				acc = $temp$acc;
				continue compressNodes;
			}
		}
	});
var $elm$core$Tuple$first = function (_v0) {
	var x = _v0.a;
	return x;
};
var $elm$core$Array$treeFromBuilder = F2(
	function (nodeList, nodeListSize) {
		treeFromBuilder:
		while (true) {
			var newNodeSize = $elm$core$Basics$ceiling(nodeListSize / $elm$core$Array$branchFactor);
			if (newNodeSize === 1) {
				return A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodeList).a;
			} else {
				var $temp$nodeList = A2($elm$core$Array$compressNodes, nodeList, _List_Nil),
					$temp$nodeListSize = newNodeSize;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue treeFromBuilder;
			}
		}
	});
var $elm$core$Array$builderToArray = F2(
	function (reverseNodeList, builder) {
		if (!builder.p) {
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.r),
				$elm$core$Array$shiftStep,
				$elm$core$Elm$JsArray$empty,
				builder.r);
		} else {
			var treeLen = builder.p * $elm$core$Array$branchFactor;
			var depth = $elm$core$Basics$floor(
				A2($elm$core$Basics$logBase, $elm$core$Array$branchFactor, treeLen - 1));
			var correctNodeList = reverseNodeList ? $elm$core$List$reverse(builder.s) : builder.s;
			var tree = A2($elm$core$Array$treeFromBuilder, correctNodeList, builder.p);
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.r) + treeLen,
				A2($elm$core$Basics$max, 5, depth * $elm$core$Array$shiftStep),
				tree,
				builder.r);
		}
	});
var $elm$core$Basics$idiv = _Basics_idiv;
var $elm$core$Basics$lt = _Utils_lt;
var $elm$core$Array$initializeHelp = F5(
	function (fn, fromIndex, len, nodeList, tail) {
		initializeHelp:
		while (true) {
			if (fromIndex < 0) {
				return A2(
					$elm$core$Array$builderToArray,
					false,
					{s: nodeList, p: (len / $elm$core$Array$branchFactor) | 0, r: tail});
			} else {
				var leaf = $elm$core$Array$Leaf(
					A3($elm$core$Elm$JsArray$initialize, $elm$core$Array$branchFactor, fromIndex, fn));
				var $temp$fn = fn,
					$temp$fromIndex = fromIndex - $elm$core$Array$branchFactor,
					$temp$len = len,
					$temp$nodeList = A2($elm$core$List$cons, leaf, nodeList),
					$temp$tail = tail;
				fn = $temp$fn;
				fromIndex = $temp$fromIndex;
				len = $temp$len;
				nodeList = $temp$nodeList;
				tail = $temp$tail;
				continue initializeHelp;
			}
		}
	});
var $elm$core$Basics$remainderBy = _Basics_remainderBy;
var $elm$core$Array$initialize = F2(
	function (len, fn) {
		if (len <= 0) {
			return $elm$core$Array$empty;
		} else {
			var tailLen = len % $elm$core$Array$branchFactor;
			var tail = A3($elm$core$Elm$JsArray$initialize, tailLen, len - tailLen, fn);
			var initialFromIndex = (len - tailLen) - $elm$core$Array$branchFactor;
			return A5($elm$core$Array$initializeHelp, fn, initialFromIndex, len, _List_Nil, tail);
		}
	});
var $elm$core$Basics$True = 0;
var $elm$core$Result$isOk = function (result) {
	if (!result.$) {
		return true;
	} else {
		return false;
	}
};
var $elm$json$Json$Decode$andThen = _Json_andThen;
var $elm$json$Json$Decode$bool = _Json_decodeBool;
var $elm$json$Json$Decode$map = _Json_map1;
var $elm$json$Json$Decode$map2 = _Json_map2;
var $elm$json$Json$Decode$succeed = _Json_succeed;
var $elm$virtual_dom$VirtualDom$toHandlerInt = function (handler) {
	switch (handler.$) {
		case 0:
			return 0;
		case 1:
			return 1;
		case 2:
			return 2;
		default:
			return 3;
	}
};
var $elm$browser$Browser$External = function (a) {
	return {$: 1, a: a};
};
var $elm$browser$Browser$Internal = function (a) {
	return {$: 0, a: a};
};
var $elm$core$Basics$identity = function (x) {
	return x;
};
var $elm$browser$Browser$Dom$NotFound = $elm$core$Basics$identity;
var $elm$url$Url$Http = 0;
var $elm$url$Url$Https = 1;
var $elm$url$Url$Url = F6(
	function (protocol, host, port_, path, query, fragment) {
		return {aU: fragment, bl: host, a_: path, cm: port_, cs: protocol, bz: query};
	});
var $elm$core$String$contains = _String_contains;
var $elm$core$String$length = _String_length;
var $elm$core$String$slice = _String_slice;
var $elm$core$String$dropLeft = F2(
	function (n, string) {
		return (n < 1) ? string : A3(
			$elm$core$String$slice,
			n,
			$elm$core$String$length(string),
			string);
	});
var $elm$core$String$indexes = _String_indexes;
var $elm$core$String$isEmpty = function (string) {
	return string === '';
};
var $elm$core$String$left = F2(
	function (n, string) {
		return (n < 1) ? '' : A3($elm$core$String$slice, 0, n, string);
	});
var $elm$core$String$toInt = _String_toInt;
var $elm$url$Url$chompBeforePath = F5(
	function (protocol, path, params, frag, str) {
		if ($elm$core$String$isEmpty(str) || A2($elm$core$String$contains, '@', str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, ':', str);
			if (!_v0.b) {
				return $elm$core$Maybe$Just(
					A6($elm$url$Url$Url, protocol, str, $elm$core$Maybe$Nothing, path, params, frag));
			} else {
				if (!_v0.b.b) {
					var i = _v0.a;
					var _v1 = $elm$core$String$toInt(
						A2($elm$core$String$dropLeft, i + 1, str));
					if (_v1.$ === 1) {
						return $elm$core$Maybe$Nothing;
					} else {
						var port_ = _v1;
						return $elm$core$Maybe$Just(
							A6(
								$elm$url$Url$Url,
								protocol,
								A2($elm$core$String$left, i, str),
								port_,
								path,
								params,
								frag));
					}
				} else {
					return $elm$core$Maybe$Nothing;
				}
			}
		}
	});
var $elm$url$Url$chompBeforeQuery = F4(
	function (protocol, params, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '/', str);
			if (!_v0.b) {
				return A5($elm$url$Url$chompBeforePath, protocol, '/', params, frag, str);
			} else {
				var i = _v0.a;
				return A5(
					$elm$url$Url$chompBeforePath,
					protocol,
					A2($elm$core$String$dropLeft, i, str),
					params,
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompBeforeFragment = F3(
	function (protocol, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '?', str);
			if (!_v0.b) {
				return A4($elm$url$Url$chompBeforeQuery, protocol, $elm$core$Maybe$Nothing, frag, str);
			} else {
				var i = _v0.a;
				return A4(
					$elm$url$Url$chompBeforeQuery,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompAfterProtocol = F2(
	function (protocol, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '#', str);
			if (!_v0.b) {
				return A3($elm$url$Url$chompBeforeFragment, protocol, $elm$core$Maybe$Nothing, str);
			} else {
				var i = _v0.a;
				return A3(
					$elm$url$Url$chompBeforeFragment,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$core$String$startsWith = _String_startsWith;
var $elm$url$Url$fromString = function (str) {
	return A2($elm$core$String$startsWith, 'http://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		0,
		A2($elm$core$String$dropLeft, 7, str)) : (A2($elm$core$String$startsWith, 'https://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		1,
		A2($elm$core$String$dropLeft, 8, str)) : $elm$core$Maybe$Nothing);
};
var $elm$core$Basics$never = function (_v0) {
	never:
	while (true) {
		var nvr = _v0;
		var $temp$_v0 = nvr;
		_v0 = $temp$_v0;
		continue never;
	}
};
var $elm$core$Task$Perform = $elm$core$Basics$identity;
var $elm$core$Task$succeed = _Scheduler_succeed;
var $elm$core$Task$init = $elm$core$Task$succeed(0);
var $elm$core$List$foldrHelper = F4(
	function (fn, acc, ctr, ls) {
		if (!ls.b) {
			return acc;
		} else {
			var a = ls.a;
			var r1 = ls.b;
			if (!r1.b) {
				return A2(fn, a, acc);
			} else {
				var b = r1.a;
				var r2 = r1.b;
				if (!r2.b) {
					return A2(
						fn,
						a,
						A2(fn, b, acc));
				} else {
					var c = r2.a;
					var r3 = r2.b;
					if (!r3.b) {
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(fn, c, acc)));
					} else {
						var d = r3.a;
						var r4 = r3.b;
						var res = (ctr > 500) ? A3(
							$elm$core$List$foldl,
							fn,
							acc,
							$elm$core$List$reverse(r4)) : A4($elm$core$List$foldrHelper, fn, acc, ctr + 1, r4);
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(
									fn,
									c,
									A2(fn, d, res))));
					}
				}
			}
		}
	});
var $elm$core$List$foldr = F3(
	function (fn, acc, ls) {
		return A4($elm$core$List$foldrHelper, fn, acc, 0, ls);
	});
var $elm$core$List$map = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, acc) {
					return A2(
						$elm$core$List$cons,
						f(x),
						acc);
				}),
			_List_Nil,
			xs);
	});
var $elm$core$Task$andThen = _Scheduler_andThen;
var $elm$core$Task$map = F2(
	function (func, taskA) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return $elm$core$Task$succeed(
					func(a));
			},
			taskA);
	});
var $elm$core$Task$map2 = F3(
	function (func, taskA, taskB) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return A2(
					$elm$core$Task$andThen,
					function (b) {
						return $elm$core$Task$succeed(
							A2(func, a, b));
					},
					taskB);
			},
			taskA);
	});
var $elm$core$Task$sequence = function (tasks) {
	return A3(
		$elm$core$List$foldr,
		$elm$core$Task$map2($elm$core$List$cons),
		$elm$core$Task$succeed(_List_Nil),
		tasks);
};
var $elm$core$Platform$sendToApp = _Platform_sendToApp;
var $elm$core$Task$spawnCmd = F2(
	function (router, _v0) {
		var task = _v0;
		return _Scheduler_spawn(
			A2(
				$elm$core$Task$andThen,
				$elm$core$Platform$sendToApp(router),
				task));
	});
var $elm$core$Task$onEffects = F3(
	function (router, commands, state) {
		return A2(
			$elm$core$Task$map,
			function (_v0) {
				return 0;
			},
			$elm$core$Task$sequence(
				A2(
					$elm$core$List$map,
					$elm$core$Task$spawnCmd(router),
					commands)));
	});
var $elm$core$Task$onSelfMsg = F3(
	function (_v0, _v1, _v2) {
		return $elm$core$Task$succeed(0);
	});
var $elm$core$Task$cmdMap = F2(
	function (tagger, _v0) {
		var task = _v0;
		return A2($elm$core$Task$map, tagger, task);
	});
_Platform_effectManagers['Task'] = _Platform_createManager($elm$core$Task$init, $elm$core$Task$onEffects, $elm$core$Task$onSelfMsg, $elm$core$Task$cmdMap);
var $elm$core$Task$command = _Platform_leaf('Task');
var $elm$core$Task$perform = F2(
	function (toMessage, task) {
		return $elm$core$Task$command(
			A2($elm$core$Task$map, toMessage, task));
	});
var $elm$browser$Browser$element = _Browser_element;
var $elm$json$Json$Decode$field = _Json_decodeField;
var $elm$json$Json$Decode$index = _Json_decodeIndex;
var $author$project$OptionList$FancyOptionList = function (a) {
	return {$: 0, a: a};
};
var $author$project$OutputStyle$FixedSearchStringMinimumLength = function (a) {
	return {$: 0, a: a};
};
var $author$project$OptionDisplay$MatureOption = 1;
var $author$project$MuchSelect$NoEffect = {$: 0};
var $author$project$OutputStyle$NoMinimumToSearchStringLength = {$: 1};
var $author$project$OptionSorting$NoSorting = 0;
var $author$project$RightSlot$NotInFocusTransition = 1;
var $author$project$MuchSelect$ReportErrorMessage = function (a) {
	return {$: 18, a: a};
};
var $author$project$MuchSelect$ReportReady = {$: 19};
var $author$project$RightSlot$ShowClearButton = {$: 3};
var $author$project$RightSlot$ShowDropdownIndicator = function (a) {
	return {$: 2, a: a};
};
var $author$project$RightSlot$ShowLoadingIndicator = {$: 1};
var $author$project$RightSlot$ShowNothing = {$: 0};
var $author$project$MuchSelect$UpdateOptionsInWebWorker = {$: 8};
var $author$project$MuchSelect$ValueCasing = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $author$project$Option$DatalistOption = function (a) {
	return {$: 1, a: a};
};
var $author$project$Option$FancyOption = function (a) {
	return {$: 0, a: a};
};
var $author$project$OptionList$DatalistOptionList = function (a) {
	return {$: 1, a: a};
};
var $author$project$OptionList$SlottedOptionList = function (a) {
	return {$: 2, a: a};
};
var $author$project$OptionList$optionTypeMatches = F2(
	function (option, optionList) {
		switch (optionList.$) {
			case 0:
				if (!option.$) {
					return true;
				} else {
					return false;
				}
			case 1:
				if (option.$ === 1) {
					return true;
				} else {
					return false;
				}
			default:
				if (option.$ === 2) {
					return true;
				} else {
					return false;
				}
		}
	});
var $author$project$OptionList$addAdditionalOption = F2(
	function (option, optionList) {
		if (A2($author$project$OptionList$optionTypeMatches, option, optionList)) {
			switch (optionList.$) {
				case 0:
					var options = optionList.a;
					return $author$project$OptionList$FancyOptionList(
						A2($elm$core$List$cons, option, options));
				case 1:
					var options = optionList.a;
					return $author$project$OptionList$DatalistOptionList(
						A2($elm$core$List$cons, option, options));
				default:
					var options = optionList.a;
					return $author$project$OptionList$SlottedOptionList(
						A2($elm$core$List$cons, option, options));
			}
		} else {
			return optionList;
		}
	});
var $author$project$FancyOption$EmptyFancyOption = F2(
	function (a, b) {
		return {$: 2, a: a, b: b};
	});
var $author$project$FancyOption$FancyOption = F7(
	function (a, b, c, d, e, f, g) {
		return {$: 0, a: a, b: b, c: c, d: d, e: e, f: f, g: g};
	});
var $author$project$OptionGroup$NoOptionGroup = {$: 1};
var $author$project$OptionValue$OptionValue = function (a) {
	return {$: 0, a: a};
};
var $author$project$OptionDisplay$OptionShown = function (a) {
	return {$: 0, a: a};
};
var $author$project$OptionDisplay$default = $author$project$OptionDisplay$OptionShown(1);
var $author$project$OptionPart$OptionPart = $elm$core$Basics$identity;
var $author$project$OptionPart$empty = '';
var $elm$core$Basics$always = F2(
	function (a, _v0) {
		return a;
	});
var $elm$core$String$append = _String_append;
var $elm$core$Basics$composeR = F3(
	function (f, g, x) {
		return g(
			f(x));
	});
var $elm$regex$Regex$Match = F4(
	function (match, index, number, submatches) {
		return {dj: index, dv: match, dP: number, ea: submatches};
	});
var $elm$regex$Regex$fromStringWith = _Regex_fromStringWith;
var $elm$regex$Regex$fromString = function (string) {
	return A2(
		$elm$regex$Regex$fromStringWith,
		{cV: false, dE: false},
		string);
};
var $elm$regex$Regex$never = _Regex_never;
var $elm$core$Maybe$withDefault = F2(
	function (_default, maybe) {
		if (!maybe.$) {
			var value = maybe.a;
			return value;
		} else {
			return _default;
		}
	});
var $elm_community$string_extra$String$Extra$regexFromString = A2(
	$elm$core$Basics$composeR,
	$elm$regex$Regex$fromString,
	$elm$core$Maybe$withDefault($elm$regex$Regex$never));
var $elm$regex$Regex$replace = _Regex_replaceAtMost(_Regex_infinity);
var $elm$core$String$toLower = _String_toLower;
var $elm$core$String$trim = _String_trim;
var $elm_community$string_extra$String$Extra$dasherize = function (string) {
	return $elm$core$String$toLower(
		A3(
			$elm$regex$Regex$replace,
			$elm_community$string_extra$String$Extra$regexFromString('[_-\\s]+'),
			$elm$core$Basics$always('-'),
			A3(
				$elm$regex$Regex$replace,
				$elm_community$string_extra$String$Extra$regexFromString('([A-Z])'),
				A2(
					$elm$core$Basics$composeR,
					function ($) {
						return $.dv;
					},
					$elm$core$String$append('-')),
				$elm$core$String$trim(string))));
};
var $author$project$OptionPart$fromString = function (string) {
	var partString = $elm_community$string_extra$String$Extra$dasherize(
		$elm$core$String$trim(string));
	if (partString === '') {
		return $elm$core$Maybe$Nothing;
	} else {
		return $elm$core$Maybe$Just(string);
	}
};
var $author$project$OptionPart$fromStringOrEmpty = function (string) {
	var _v0 = $author$project$OptionPart$fromString(string);
	if (_v0.$ === 1) {
		return $author$project$OptionPart$empty;
	} else {
		var part = _v0.a;
		return part;
	}
};
var $author$project$SortRank$NoSortRank = {$: 2};
var $author$project$OptionLabel$OptionLabel = F3(
	function (a, b, c) {
		return {$: 0, a: a, b: b, c: c};
	});
var $author$project$OptionLabel$newWithCleanLabel = F2(
	function (string, maybeString) {
		return A3($author$project$OptionLabel$OptionLabel, string, maybeString, $author$project$SortRank$NoSortRank);
	});
var $author$project$OptionDescription$NoDescription = {$: 1};
var $author$project$OptionDescription$noDescription = $author$project$OptionDescription$NoDescription;
var $author$project$FancyOption$new = F2(
	function (value, maybeCleanLabel) {
		if (value === '') {
			return A2(
				$author$project$FancyOption$EmptyFancyOption,
				$author$project$OptionDisplay$default,
				A2($author$project$OptionLabel$newWithCleanLabel, '', maybeCleanLabel));
		} else {
			return A7(
				$author$project$FancyOption$FancyOption,
				$author$project$OptionDisplay$default,
				A2($author$project$OptionLabel$newWithCleanLabel, value, maybeCleanLabel),
				$author$project$OptionValue$OptionValue(value),
				$author$project$OptionDescription$noDescription,
				$author$project$OptionGroup$NoOptionGroup,
				$author$project$OptionPart$fromStringOrEmpty(value),
				$elm$core$Maybe$Nothing);
		}
	});
var $author$project$DatalistOption$DatalistOption = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $author$project$OptionDisplay$OptionSelected = F2(
	function (a, b) {
		return {$: 2, a: a, b: b};
	});
var $author$project$OptionDisplay$selected = function (index) {
	return A2($author$project$OptionDisplay$OptionSelected, index, 1);
};
var $author$project$DatalistOption$newSelected = F2(
	function (optionValue, selectedIndex) {
		return A2(
			$author$project$DatalistOption$DatalistOption,
			$author$project$OptionDisplay$selected(selectedIndex),
			optionValue);
	});
var $author$project$FancyOption$getOptionDisplay = function (option) {
	switch (option.$) {
		case 0:
			var display = option.a;
			return display;
		case 1:
			var optionDisplay = option.a;
			return optionDisplay;
		default:
			var optionDisplay = option.a;
			return optionDisplay;
	}
};
var $author$project$OptionDisplay$OptionSelectedHighlighted = function (a) {
	return {$: 5, a: a};
};
var $author$project$OptionDisplay$select = F2(
	function (selectedIndex, optionDisplay) {
		switch (optionDisplay.$) {
			case 0:
				var age = optionDisplay.a;
				return A2($author$project$OptionDisplay$OptionSelected, selectedIndex, age);
			case 1:
				return A2($author$project$OptionDisplay$OptionSelected, selectedIndex, 1);
			case 2:
				var age = optionDisplay.b;
				return A2($author$project$OptionDisplay$OptionSelected, selectedIndex, age);
			case 4:
				return optionDisplay;
			case 3:
				return optionDisplay;
			case 5:
				return $author$project$OptionDisplay$OptionSelectedHighlighted(selectedIndex);
			case 6:
				return A2($author$project$OptionDisplay$OptionSelected, selectedIndex, 1);
			case 8:
				return optionDisplay;
			default:
				return A2($author$project$OptionDisplay$OptionSelected, selectedIndex, 1);
		}
	});
var $author$project$FancyOption$CustomFancyOption = F4(
	function (a, b, c, d) {
		return {$: 1, a: a, b: b, c: c, d: d};
	});
var $author$project$FancyOption$setOptionDisplay = F2(
	function (optionDisplay, option) {
		switch (option.$) {
			case 0:
				var optionLabel = option.b;
				var optionValue = option.c;
				var optionDescription = option.d;
				var optionGroup = option.e;
				var optionPart = option.f;
				var search = option.g;
				return A7($author$project$FancyOption$FancyOption, optionDisplay, optionLabel, optionValue, optionDescription, optionGroup, optionPart, search);
			case 1:
				var optionLabel = option.b;
				var optionValue = option.c;
				var maybeOptionSearchFilter = option.d;
				return A4($author$project$FancyOption$CustomFancyOption, optionDisplay, optionLabel, optionValue, maybeOptionSearchFilter);
			default:
				var optionLabel = option.b;
				return A2($author$project$FancyOption$EmptyFancyOption, optionDisplay, optionLabel);
		}
	});
var $author$project$OptionValue$toOptionLabel = function (optionValue) {
	if (!optionValue.$) {
		var valueString = optionValue.a;
		return A2(
			$author$project$OptionLabel$newWithCleanLabel,
			valueString,
			$elm$core$Maybe$Just(valueString));
	} else {
		return A2($author$project$OptionLabel$newWithCleanLabel, '', $elm$core$Maybe$Nothing);
	}
};
var $author$project$FancyOption$setOptionLabelToValue = function (fancyOption) {
	if (fancyOption.$ === 1) {
		var optionDisplay = fancyOption.a;
		var optionValue = fancyOption.c;
		var maybeOptionSearchFilter = fancyOption.d;
		return A4(
			$author$project$FancyOption$CustomFancyOption,
			optionDisplay,
			$author$project$OptionValue$toOptionLabel(optionValue),
			optionValue,
			maybeOptionSearchFilter);
	} else {
		return fancyOption;
	}
};
var $author$project$FancyOption$select = F2(
	function (selectionIndex, option) {
		switch (option.$) {
			case 0:
				return A2(
					$author$project$FancyOption$setOptionDisplay,
					A2(
						$author$project$OptionDisplay$select,
						selectionIndex,
						$author$project$FancyOption$getOptionDisplay(option)),
					option);
			case 1:
				return $author$project$FancyOption$setOptionLabelToValue(
					A2(
						$author$project$FancyOption$setOptionDisplay,
						A2(
							$author$project$OptionDisplay$select,
							selectionIndex,
							$author$project$FancyOption$getOptionDisplay(option)),
						option));
			default:
				return A2(
					$author$project$FancyOption$setOptionDisplay,
					A2(
						$author$project$OptionDisplay$select,
						selectionIndex,
						$author$project$FancyOption$getOptionDisplay(option)),
					option);
		}
	});
var $author$project$OptionValue$EmptyOptionValue = {$: 1};
var $author$project$OptionValue$stringToOptionValue = function (string) {
	if (string === '') {
		return $author$project$OptionValue$EmptyOptionValue;
	} else {
		return $author$project$OptionValue$OptionValue(string);
	}
};
var $author$project$OptionList$addAdditionalSelectedOptionWithStringValue = F2(
	function (string, optionList) {
		switch (optionList.$) {
			case 0:
				var newOption = $author$project$Option$FancyOption(
					A2(
						$author$project$FancyOption$select,
						0,
						A2($author$project$FancyOption$new, string, $elm$core$Maybe$Nothing)));
				return A2($author$project$OptionList$addAdditionalOption, newOption, optionList);
			case 1:
				var newOption = $author$project$Option$DatalistOption(
					A2(
						$author$project$DatalistOption$newSelected,
						$author$project$OptionValue$stringToOptionValue(string),
						0));
				return A2($author$project$OptionList$addAdditionalOption, newOption, optionList);
			default:
				return optionList;
		}
	});
var $author$project$OptionList$append = F2(
	function (optionListA, optionListB) {
		switch (optionListA.$) {
			case 0:
				var options = optionListA.a;
				if (!optionListB.$) {
					var optionsB = optionListB.a;
					return $author$project$OptionList$FancyOptionList(
						_Utils_ap(options, optionsB));
				} else {
					return optionListA;
				}
			case 1:
				var optionsA = optionListA.a;
				if (optionListB.$ === 1) {
					var optionsB = optionListB.a;
					return $author$project$OptionList$DatalistOptionList(
						_Utils_ap(optionsA, optionsB));
				} else {
					return optionListA;
				}
			default:
				var options = optionListA.a;
				if (optionListB.$ === 2) {
					var optionsB = optionListB.a;
					return $author$project$OptionList$SlottedOptionList(
						_Utils_ap(options, optionsB));
				} else {
					return optionListA;
				}
		}
	});
var $elm$core$List$any = F2(
	function (isOkay, list) {
		any:
		while (true) {
			if (!list.b) {
				return false;
			} else {
				var x = list.a;
				var xs = list.b;
				if (isOkay(x)) {
					return true;
				} else {
					var $temp$isOkay = isOkay,
						$temp$list = xs;
					isOkay = $temp$isOkay;
					list = $temp$list;
					continue any;
				}
			}
		}
	});
var $author$project$OptionList$any = F2(
	function (_function, optionList) {
		switch (optionList.$) {
			case 0:
				var options = optionList.a;
				return A2($elm$core$List$any, _function, options);
			case 1:
				var options = optionList.a;
				return A2($elm$core$List$any, _function, options);
			default:
				var options = optionList.a;
				return A2($elm$core$List$any, _function, options);
		}
	});
var $author$project$OptionValue$equals = F2(
	function (a, b) {
		return _Utils_eq(a, b);
	});
var $author$project$DatalistOption$getOptionValue = function (datalistOption) {
	var optionValue = datalistOption.b;
	return optionValue;
};
var $author$project$FancyOption$getOptionValue = function (option) {
	switch (option.$) {
		case 0:
			var optionValue = option.c;
			return optionValue;
		case 1:
			var optionValue = option.c;
			return optionValue;
		default:
			return $author$project$OptionValue$EmptyOptionValue;
	}
};
var $author$project$SlottedOption$getOptionValue = function (slottedOption) {
	var optionValue = slottedOption.b;
	return optionValue;
};
var $author$project$Option$getOptionValue = function (option) {
	switch (option.$) {
		case 0:
			var fancyOption = option.a;
			return $author$project$FancyOption$getOptionValue(fancyOption);
		case 1:
			var datalistOption = option.a;
			return $author$project$DatalistOption$getOptionValue(datalistOption);
		default:
			var slottedOption = option.a;
			return $author$project$SlottedOption$getOptionValue(slottedOption);
	}
};
var $author$project$Option$optionEqualsOptionValue = F2(
	function (optionValue, option) {
		return A2(
			$author$project$OptionValue$equals,
			$author$project$Option$getOptionValue(option),
			optionValue);
	});
var $author$project$OptionList$hasOptionValue = F2(
	function (optionValue, optionsList) {
		return A2(
			$author$project$OptionList$any,
			$author$project$Option$optionEqualsOptionValue(optionValue),
			optionsList);
	});
var $author$project$OptionList$hasOptionByValueString = F2(
	function (string, optionList) {
		return A2(
			$author$project$OptionList$hasOptionValue,
			$author$project$OptionValue$stringToOptionValue(string),
			optionList);
	});
var $author$project$OptionList$map = F2(
	function (_function, optionList) {
		switch (optionList.$) {
			case 0:
				var options = optionList.a;
				return $author$project$OptionList$FancyOptionList(
					A2($elm$core$List$map, _function, options));
			case 1:
				var options = optionList.a;
				return $author$project$OptionList$DatalistOptionList(
					A2($elm$core$List$map, _function, options));
			default:
				var options = optionList.a;
				return $author$project$OptionList$SlottedOptionList(
					A2($elm$core$List$map, _function, options));
		}
	});
var $author$project$Option$SlottedOption = function (a) {
	return {$: 2, a: a};
};
var $author$project$DatalistOption$getOptionDisplay = function (datalistOption) {
	var optionDisplay = datalistOption.a;
	return optionDisplay;
};
var $author$project$DatalistOption$setOptionDisplay = F2(
	function (optionDisplay, datalistOption) {
		var optionValue = datalistOption.b;
		return A2($author$project$DatalistOption$DatalistOption, optionDisplay, optionValue);
	});
var $author$project$DatalistOption$select = F2(
	function (selectionIndex, option) {
		return A2(
			$author$project$DatalistOption$setOptionDisplay,
			A2(
				$author$project$OptionDisplay$select,
				selectionIndex,
				$author$project$DatalistOption$getOptionDisplay(option)),
			option);
	});
var $author$project$SlottedOption$getOptionDisplay = function (slottedOption) {
	var optionDisplay = slottedOption.a;
	return optionDisplay;
};
var $author$project$SlottedOption$SlottedOption = F3(
	function (a, b, c) {
		return {$: 0, a: a, b: b, c: c};
	});
var $author$project$SlottedOption$setOptionDisplay = F2(
	function (optionDisplay, slottedOption) {
		var optionValue = slottedOption.b;
		var optionSlot = slottedOption.c;
		return A3($author$project$SlottedOption$SlottedOption, optionDisplay, optionValue, optionSlot);
	});
var $author$project$SlottedOption$select = F2(
	function (selectionIndex, option) {
		return A2(
			$author$project$SlottedOption$setOptionDisplay,
			A2(
				$author$project$OptionDisplay$select,
				selectionIndex,
				$author$project$SlottedOption$getOptionDisplay(option)),
			option);
	});
var $author$project$Option$select = F2(
	function (selectionIndex, option) {
		switch (option.$) {
			case 0:
				var fancyOption = option.a;
				return $author$project$Option$FancyOption(
					A2($author$project$FancyOption$select, selectionIndex, fancyOption));
			case 1:
				var datalistOption = option.a;
				return $author$project$Option$DatalistOption(
					A2($author$project$DatalistOption$select, selectionIndex, datalistOption));
			default:
				var slottedOption = option.a;
				return $author$project$Option$SlottedOption(
					A2($author$project$SlottedOption$select, selectionIndex, slottedOption));
		}
	});
var $author$project$OptionList$selectOptionByOptionValueWithIndex = F3(
	function (index, optionValue, optionList) {
		return A2(
			$author$project$OptionList$map,
			function (option_) {
				return A2($author$project$Option$optionEqualsOptionValue, optionValue, option_) ? A2($author$project$Option$select, index, option_) : option_;
			},
			optionList);
	});
var $author$project$OptionList$selectOptionIByValueStringWithIndex = F3(
	function (_int, string, optionList) {
		return A3(
			$author$project$OptionList$selectOptionByOptionValueWithIndex,
			_int,
			$author$project$OptionValue$stringToOptionValue(string),
			optionList);
	});
var $author$project$OptionList$addAndSelectOptionsInOptionsListByString = F2(
	function (strings, optionList) {
		var helper = F3(
			function (index, valueStrings, optionList_) {
				helper:
				while (true) {
					if (!valueStrings.b) {
						return optionList_;
					} else {
						if (!valueStrings.b.b) {
							var valueString = valueStrings.a;
							if (A2($author$project$OptionList$hasOptionByValueString, valueString, optionList_)) {
								return A3($author$project$OptionList$selectOptionIByValueStringWithIndex, index, valueString, optionList_);
							} else {
								var maybeSelectedOptions = function () {
									switch (optionList_.$) {
										case 0:
											return $elm$core$Maybe$Just(
												$author$project$OptionList$FancyOptionList(
													_List_fromArray(
														[
															$author$project$Option$FancyOption(
															A2(
																$author$project$FancyOption$select,
																index,
																A2($author$project$FancyOption$new, valueString, $elm$core$Maybe$Nothing)))
														])));
										case 1:
											return $elm$core$Maybe$Just(
												$author$project$OptionList$DatalistOptionList(
													_List_fromArray(
														[
															$author$project$Option$DatalistOption(
															A2(
																$author$project$DatalistOption$newSelected,
																$author$project$OptionValue$stringToOptionValue(valueString),
																index))
														])));
										default:
											return $elm$core$Maybe$Nothing;
									}
								}();
								if (!maybeSelectedOptions.$) {
									var selectedOptionsList_ = maybeSelectedOptions.a;
									return A2($author$project$OptionList$append, optionList_, selectedOptionsList_);
								} else {
									return optionList_;
								}
							}
						} else {
							var valueString = valueStrings.a;
							var restOfValueStrings = valueStrings.b;
							if (A2($author$project$OptionList$hasOptionByValueString, valueString, optionList_)) {
								var $temp$index = index + 1,
									$temp$valueStrings = restOfValueStrings,
									$temp$optionList_ = A3($author$project$OptionList$selectOptionIByValueStringWithIndex, index, valueString, optionList_);
								index = $temp$index;
								valueStrings = $temp$valueStrings;
								optionList_ = $temp$optionList_;
								continue helper;
							} else {
								var maybeSelectedOptions = function () {
									switch (optionList_.$) {
										case 0:
											return $elm$core$Maybe$Just(
												$author$project$OptionList$FancyOptionList(
													_List_fromArray(
														[
															$author$project$Option$FancyOption(
															A2(
																$author$project$FancyOption$select,
																index,
																A2($author$project$FancyOption$new, valueString, $elm$core$Maybe$Nothing)))
														])));
										case 1:
											return $elm$core$Maybe$Just(
												$author$project$OptionList$DatalistOptionList(
													_List_fromArray(
														[
															$author$project$Option$DatalistOption(
															A2(
																$author$project$DatalistOption$newSelected,
																$author$project$OptionValue$stringToOptionValue(valueString),
																index))
														])));
										default:
											return $elm$core$Maybe$Nothing;
									}
								}();
								if (!maybeSelectedOptions.$) {
									var selectedOptionsList_ = maybeSelectedOptions.a;
									var $temp$index = index + 1,
										$temp$valueStrings = restOfValueStrings,
										$temp$optionList_ = A2($author$project$OptionList$append, optionList_, selectedOptionsList_);
									index = $temp$index;
									valueStrings = $temp$valueStrings;
									optionList_ = $temp$optionList_;
									continue helper;
								} else {
									return optionList_;
								}
							}
						}
					}
				}
			});
		return A3(helper, 0, strings, optionList);
	});
var $author$project$MuchSelect$Batch = function (a) {
	return {$: 1, a: a};
};
var $author$project$MuchSelect$batch = function (effects) {
	return $author$project$MuchSelect$Batch(effects);
};
var $elm$core$Basics$composeL = F3(
	function (g, f, x) {
		return g(
			f(x));
	});
var $elm$json$Json$Decode$decodeString = _Json_runOnString;
var $author$project$TransformAndValidate$ValueTransformAndValidate = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $elm$json$Json$Decode$list = _Json_decodeList;
var $elm$json$Json$Decode$oneOf = _Json_oneOf;
var $author$project$TransformAndValidate$ToLowercase = 0;
var $author$project$TransformAndValidate$is = F2(
	function (a, b) {
		return _Utils_eq(a, b);
	});
var $elm$json$Json$Decode$string = _Json_decodeString;
var $elm$json$Json$Decode$fail = _Json_fail;
var $elm_community$json_extra$Json$Decode$Extra$when = F3(
	function (checkDecoder, check, passDecoder) {
		return A2(
			$elm$json$Json$Decode$andThen,
			function (checkVal) {
				return check(checkVal) ? passDecoder : $elm$json$Json$Decode$fail('Check failed with input');
			},
			checkDecoder);
	});
var $author$project$TransformAndValidate$toLowercaseDecoder = A3(
	$elm_community$json_extra$Json$Decode$Extra$when,
	A2($elm$json$Json$Decode$field, 'name', $elm$json$Json$Decode$string),
	$author$project$TransformAndValidate$is('lowercase'),
	$elm$json$Json$Decode$succeed(0));
var $author$project$TransformAndValidate$transformerDecoder = $elm$json$Json$Decode$oneOf(
	_List_fromArray(
		[$author$project$TransformAndValidate$toLowercaseDecoder]));
var $author$project$TransformAndValidate$Custom = {$: 2};
var $author$project$TransformAndValidate$customValidatorDecoder = A3(
	$elm_community$json_extra$Json$Decode$Extra$when,
	A2($elm$json$Json$Decode$field, 'name', $elm$json$Json$Decode$string),
	$author$project$TransformAndValidate$is('custom'),
	$elm$json$Json$Decode$succeed($author$project$TransformAndValidate$Custom));
var $author$project$TransformAndValidate$MinimumLength = F3(
	function (a, b, c) {
		return {$: 1, a: a, b: b, c: c};
	});
var $elm$json$Json$Decode$int = _Json_decodeInt;
var $elm$json$Json$Decode$map3 = _Json_map3;
var $author$project$TransformAndValidate$ValidationErrorMessage = $elm$core$Basics$identity;
var $author$project$TransformAndValidate$validationErrorMessageDecoder = A2($elm$json$Json$Decode$map, $elm$core$Basics$identity, $elm$json$Json$Decode$string);
var $author$project$TransformAndValidate$ShowError = 1;
var $author$project$TransformAndValidate$SilentError = 0;
var $author$project$TransformAndValidate$validationReportLevelDecoder = A2(
	$elm$json$Json$Decode$andThen,
	function (str) {
		switch (str) {
			case 'error':
				return $elm$json$Json$Decode$succeed(1);
			case 'silent':
				return $elm$json$Json$Decode$succeed(0);
			default:
				return $elm$json$Json$Decode$fail('Unknown validation reporting level: ' + str);
		}
	},
	$elm$json$Json$Decode$string);
var $author$project$TransformAndValidate$minimumLengthDecoder = A3(
	$elm_community$json_extra$Json$Decode$Extra$when,
	A2($elm$json$Json$Decode$field, 'name', $elm$json$Json$Decode$string),
	$author$project$TransformAndValidate$is('minimum-length'),
	A4(
		$elm$json$Json$Decode$map3,
		$author$project$TransformAndValidate$MinimumLength,
		A2($elm$json$Json$Decode$field, 'level', $author$project$TransformAndValidate$validationReportLevelDecoder),
		A2($elm$json$Json$Decode$field, 'message', $author$project$TransformAndValidate$validationErrorMessageDecoder),
		A2($elm$json$Json$Decode$field, 'minimum-length', $elm$json$Json$Decode$int)));
var $author$project$TransformAndValidate$NoWhiteSpace = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $author$project$TransformAndValidate$noWhiteSpaceDecoder = A3(
	$elm_community$json_extra$Json$Decode$Extra$when,
	A2($elm$json$Json$Decode$field, 'name', $elm$json$Json$Decode$string),
	$author$project$TransformAndValidate$is('no-white-space'),
	A3(
		$elm$json$Json$Decode$map2,
		$author$project$TransformAndValidate$NoWhiteSpace,
		A2($elm$json$Json$Decode$field, 'level', $author$project$TransformAndValidate$validationReportLevelDecoder),
		A2($elm$json$Json$Decode$field, 'message', $author$project$TransformAndValidate$validationErrorMessageDecoder)));
var $author$project$TransformAndValidate$validatorDecoder = $elm$json$Json$Decode$oneOf(
	_List_fromArray(
		[$author$project$TransformAndValidate$noWhiteSpaceDecoder, $author$project$TransformAndValidate$minimumLengthDecoder, $author$project$TransformAndValidate$customValidatorDecoder]));
var $author$project$TransformAndValidate$decoder = A3(
	$elm$json$Json$Decode$map2,
	$author$project$TransformAndValidate$ValueTransformAndValidate,
	A2(
		$elm$json$Json$Decode$field,
		'transformers',
		$elm$json$Json$Decode$list($author$project$TransformAndValidate$transformerDecoder)),
	A2(
		$elm$json$Json$Decode$field,
		'validators',
		$elm$json$Json$Decode$list($author$project$TransformAndValidate$validatorDecoder)));
var $author$project$TransformAndValidate$empty = A2($author$project$TransformAndValidate$ValueTransformAndValidate, _List_Nil, _List_Nil);
var $author$project$TransformAndValidate$decode = function (jsonString) {
	return ($elm$core$String$length(jsonString) > 1) ? A2($elm$json$Json$Decode$decodeString, $author$project$TransformAndValidate$decoder, jsonString) : $elm$core$Result$Ok($author$project$TransformAndValidate$empty);
};
var $author$project$OptionDisplay$OptionDisabled = function (a) {
	return {$: 8, a: a};
};
var $author$project$OptionDisplay$decoder = function (age) {
	return $elm$json$Json$Decode$oneOf(
		_List_fromArray(
			[
				A2(
				$elm$json$Json$Decode$andThen,
				function (str) {
					if (str === 'true') {
						return $elm$json$Json$Decode$succeed(
							A2($author$project$OptionDisplay$OptionSelected, 0, age));
					} else {
						return $elm$json$Json$Decode$fail('Option is not selected');
					}
				},
				A2($elm$json$Json$Decode$field, 'selected', $elm$json$Json$Decode$string)),
				A2(
				$elm$json$Json$Decode$andThen,
				function (isSelected_) {
					return isSelected_ ? $elm$json$Json$Decode$succeed(
						A2($author$project$OptionDisplay$OptionSelected, 0, age)) : $elm$json$Json$Decode$succeed(
						$author$project$OptionDisplay$OptionShown(age));
				},
				A2($elm$json$Json$Decode$field, 'selected', $elm$json$Json$Decode$bool)),
				A2(
				$elm$json$Json$Decode$andThen,
				function (isDisabled) {
					return isDisabled ? $elm$json$Json$Decode$succeed(
						$author$project$OptionDisplay$OptionDisabled(age)) : $elm$json$Json$Decode$fail('Option is not disabled');
				},
				A2($elm$json$Json$Decode$field, 'disabled', $elm$json$Json$Decode$bool)),
				$elm$json$Json$Decode$succeed(
				$author$project$OptionDisplay$OptionShown(age))
			]));
};
var $author$project$OptionValue$decoder = A2(
	$elm$json$Json$Decode$andThen,
	function (valueStr) {
		var _v0 = $elm$core$String$trim(valueStr);
		if (_v0 === '') {
			return $elm$json$Json$Decode$succeed($author$project$OptionValue$EmptyOptionValue);
		} else {
			var str = _v0;
			return $elm$json$Json$Decode$succeed(
				$author$project$OptionValue$OptionValue(str));
		}
	},
	$elm$json$Json$Decode$string);
var $author$project$DatalistOption$decoder = A3(
	$elm$json$Json$Decode$map2,
	$author$project$DatalistOption$DatalistOption,
	$author$project$OptionDisplay$decoder(1),
	A2($elm$json$Json$Decode$field, 'value', $author$project$OptionValue$decoder));
var $elm$json$Json$Decode$null = _Json_decodeNull;
var $elm$json$Json$Decode$nullable = function (decoder) {
	return $elm$json$Json$Decode$oneOf(
		_List_fromArray(
			[
				$elm$json$Json$Decode$null($elm$core$Maybe$Nothing),
				A2($elm$json$Json$Decode$map, $elm$core$Maybe$Just, decoder)
			]));
};
var $author$project$SortRank$Auto = function (a) {
	return {$: 0, a: a};
};
var $author$project$SortRank$Manual = function (a) {
	return {$: 1, a: a};
};
var $author$project$PositiveInt$PositiveInt = $elm$core$Basics$identity;
var $elm$core$Basics$ge = _Utils_ge;
var $author$project$PositiveInt$maybeNew = function (_int) {
	return (_int >= 0) ? $elm$core$Maybe$Just(_int) : $elm$core$Maybe$Nothing;
};
var $author$project$SortRank$sortRankDecoder = $elm$json$Json$Decode$oneOf(
	_List_fromArray(
		[
			A2(
			$elm$json$Json$Decode$andThen,
			function (_int) {
				var _v0 = $author$project$PositiveInt$maybeNew(_int);
				if (!_v0.$) {
					var positiveInt = _v0.a;
					return $elm$json$Json$Decode$succeed(
						$author$project$SortRank$Auto(positiveInt));
				} else {
					return $elm$json$Json$Decode$fail('The index must be a positive number.');
				}
			},
			A2($elm$json$Json$Decode$field, 'index', $elm$json$Json$Decode$int)),
			A2(
			$elm$json$Json$Decode$andThen,
			function (_int) {
				var _v1 = $author$project$PositiveInt$maybeNew(_int);
				if (!_v1.$) {
					var positiveInt = _v1.a;
					return $elm$json$Json$Decode$succeed(
						$author$project$SortRank$Manual(positiveInt));
				} else {
					return $elm$json$Json$Decode$fail('The weight must be a positive number.');
				}
			},
			A2($elm$json$Json$Decode$field, 'weight', $elm$json$Json$Decode$int)),
			$elm$json$Json$Decode$succeed($author$project$SortRank$NoSortRank)
		]));
var $author$project$OptionLabel$labelDecoder = A4(
	$elm$json$Json$Decode$map3,
	$author$project$OptionLabel$OptionLabel,
	A2($elm$json$Json$Decode$field, 'label', $elm$json$Json$Decode$string),
	A2(
		$elm$json$Json$Decode$field,
		'labelClean',
		$elm$json$Json$Decode$nullable($elm$json$Json$Decode$string)),
	$author$project$SortRank$sortRankDecoder);
var $author$project$FancyOption$decodeEmptyOptionValue = function (age) {
	return A2(
		$elm$json$Json$Decode$andThen,
		function (value) {
			if (!value.$) {
				return $elm$json$Json$Decode$fail('It can not be an option without a value because it has a value.');
			} else {
				return A3(
					$elm$json$Json$Decode$map2,
					$author$project$FancyOption$EmptyFancyOption,
					$author$project$OptionDisplay$decoder(age),
					$author$project$OptionLabel$labelDecoder);
			}
		},
		A2($elm$json$Json$Decode$field, 'value', $author$project$OptionValue$decoder));
};
var $author$project$OptionDescription$OptionDescription = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $author$project$OptionDescription$decoder = $elm$json$Json$Decode$oneOf(
	_List_fromArray(
		[
			A3(
			$elm$json$Json$Decode$map2,
			$author$project$OptionDescription$OptionDescription,
			A2($elm$json$Json$Decode$field, 'description', $elm$json$Json$Decode$string),
			A2(
				$elm$json$Json$Decode$field,
				'descriptionClean',
				$elm$json$Json$Decode$nullable($elm$json$Json$Decode$string))),
			$elm$json$Json$Decode$succeed($author$project$OptionDescription$NoDescription)
		]));
var $author$project$OptionGroup$OptionGroup = function (a) {
	return {$: 0, a: a};
};
var $author$project$OptionGroup$decoder = $elm$json$Json$Decode$oneOf(
	_List_fromArray(
		[
			A2(
			$elm$json$Json$Decode$map,
			$author$project$OptionGroup$OptionGroup,
			A2($elm$json$Json$Decode$field, 'group', $elm$json$Json$Decode$string)),
			$elm$json$Json$Decode$succeed($author$project$OptionGroup$NoOptionGroup)
		]));
var $elm$json$Json$Decode$map7 = _Json_map7;
var $author$project$OptionPart$valueDecoder = A2(
	$elm$json$Json$Decode$andThen,
	function (s) {
		var _v0 = $author$project$OptionPart$fromString(s);
		if (_v0.$ === 1) {
			return $elm$json$Json$Decode$fail('The value is empty so we are unable to make a part of the value');
		} else {
			var part = _v0.a;
			return $elm$json$Json$Decode$succeed(part);
		}
	},
	$elm$json$Json$Decode$string);
var $author$project$FancyOption$decoderOptionWithAValue = function (age) {
	return A8(
		$elm$json$Json$Decode$map7,
		$author$project$FancyOption$FancyOption,
		$author$project$OptionDisplay$decoder(age),
		$author$project$OptionLabel$labelDecoder,
		A2($elm$json$Json$Decode$field, 'value', $author$project$OptionValue$decoder),
		$author$project$OptionDescription$decoder,
		$author$project$OptionGroup$decoder,
		A2($elm$json$Json$Decode$field, 'value', $author$project$OptionPart$valueDecoder),
		$elm$json$Json$Decode$succeed($elm$core$Maybe$Nothing));
};
var $author$project$OptionPart$decoder = A2(
	$elm$json$Json$Decode$andThen,
	function (s) {
		return _Utils_eq(
			s,
			$elm_community$string_extra$String$Extra$dasherize(s)) ? $elm$json$Json$Decode$succeed(s) : $elm$json$Json$Decode$fail('Invalid option part: ' + s);
	},
	$elm$json$Json$Decode$string);
var $author$project$FancyOption$decoderOptionWithAValueAndPart = function (age) {
	return A8(
		$elm$json$Json$Decode$map7,
		$author$project$FancyOption$FancyOption,
		$author$project$OptionDisplay$decoder(age),
		$author$project$OptionLabel$labelDecoder,
		A2($elm$json$Json$Decode$field, 'value', $author$project$OptionValue$decoder),
		$author$project$OptionDescription$decoder,
		$author$project$OptionGroup$decoder,
		A2($elm$json$Json$Decode$field, 'part', $author$project$OptionPart$decoder),
		$elm$json$Json$Decode$succeed($elm$core$Maybe$Nothing));
};
var $author$project$FancyOption$decoderWithAge = function (optionAge) {
	return $elm$json$Json$Decode$oneOf(
		_List_fromArray(
			[
				$author$project$FancyOption$decodeEmptyOptionValue(optionAge),
				$author$project$FancyOption$decoderOptionWithAValueAndPart(optionAge),
				$author$project$FancyOption$decoderOptionWithAValue(optionAge)
			]));
};
var $author$project$OptionSlot$OptionSlot = $elm$core$Basics$identity;
var $author$project$OptionSlot$decoder = A2($elm$json$Json$Decode$map, $elm$core$Basics$identity, $elm$json$Json$Decode$string);
var $author$project$SlottedOption$decoderWithAge = function (age) {
	return A4(
		$elm$json$Json$Decode$map3,
		$author$project$SlottedOption$SlottedOption,
		$author$project$OptionDisplay$decoder(age),
		A2($elm$json$Json$Decode$field, 'value', $author$project$OptionValue$decoder),
		A2($elm$json$Json$Decode$field, 'slot', $author$project$OptionSlot$decoder));
};
var $author$project$Option$decoderWithAgeAndOutputStyle = F2(
	function (optionAge, outputStyle) {
		if (!outputStyle) {
			return $elm$json$Json$Decode$oneOf(
				_List_fromArray(
					[
						A2(
						$elm$json$Json$Decode$map,
						$author$project$Option$FancyOption,
						$author$project$FancyOption$decoderWithAge(optionAge)),
						A2(
						$elm$json$Json$Decode$map,
						$author$project$Option$SlottedOption,
						$author$project$SlottedOption$decoderWithAge(optionAge))
					]));
		} else {
			return A2($elm$json$Json$Decode$map, $author$project$Option$DatalistOption, $author$project$DatalistOption$decoder);
		}
	});
var $elm$core$Basics$not = _Basics_not;
var $elm$core$List$all = F2(
	function (isOkay, list) {
		return !A2(
			$elm$core$List$any,
			A2($elm$core$Basics$composeL, $elm$core$Basics$not, isOkay),
			list);
	});
var $author$project$OptionList$allDatalistOptions = function (options) {
	return A2(
		$elm$core$List$all,
		function (option) {
			if (option.$ === 1) {
				return true;
			} else {
				return false;
			}
		},
		options);
};
var $author$project$OptionList$allFancyOptions = function (options) {
	return A2(
		$elm$core$List$all,
		function (option) {
			if (!option.$) {
				return true;
			} else {
				return false;
			}
		},
		options);
};
var $author$project$OptionList$allSlottedOptions = function (options) {
	return A2(
		$elm$core$List$all,
		function (option) {
			if (option.$ === 2) {
				return true;
			} else {
				return false;
			}
		},
		options);
};
var $author$project$OptionList$determineListType = function (options) {
	return $author$project$OptionList$allFancyOptions(options) ? $elm$core$Result$Ok(
		$author$project$OptionList$FancyOptionList(_List_Nil)) : ($author$project$OptionList$allDatalistOptions(options) ? $elm$core$Result$Ok(
		$author$project$OptionList$DatalistOptionList(_List_Nil)) : ($author$project$OptionList$allSlottedOptions(options) ? $elm$core$Result$Ok(
		$author$project$OptionList$SlottedOptionList(_List_Nil)) : $elm$core$Result$Err('The list of options must be all FancyOptions, all DatalistOptions, or all SlottedOptions')));
};
var $author$project$OptionList$decoderWithAge = F2(
	function (optionAge, outputStyle) {
		if (!outputStyle) {
			return A2(
				$elm$json$Json$Decode$andThen,
				function (options) {
					var _v1 = $author$project$OptionList$determineListType(options);
					if (!_v1.$) {
						var optionList = _v1.a;
						switch (optionList.$) {
							case 0:
								return $elm$json$Json$Decode$succeed(
									$author$project$OptionList$FancyOptionList(options));
							case 1:
								return $elm$json$Json$Decode$fail('If the output style is Custom HTML the list of options must FancyOptionList or SlottedOptionList');
							default:
								return $elm$json$Json$Decode$succeed(
									$author$project$OptionList$SlottedOptionList(options));
						}
					} else {
						var err = _v1.a;
						return $elm$json$Json$Decode$fail(err);
					}
				},
				$elm$json$Json$Decode$list(
					A2($author$project$Option$decoderWithAgeAndOutputStyle, optionAge, outputStyle)));
		} else {
			return A2(
				$elm$json$Json$Decode$map,
				$author$project$OptionList$DatalistOptionList,
				$elm$json$Json$Decode$list(
					A2($elm$json$Json$Decode$map, $author$project$Option$DatalistOption, $author$project$DatalistOption$decoder)));
		}
	});
var $author$project$OutputStyle$FixedMaxDropdownItems = function (a) {
	return {$: 0, a: a};
};
var $elm$core$Basics$negate = function (n) {
	return -n;
};
var $elm$core$Basics$abs = function (n) {
	return (n < 0) ? (-n) : n;
};
var $author$project$PositiveInt$new = function (_int) {
	return $elm$core$Basics$abs(_int);
};
var $author$project$OutputStyle$defaultMaxDropdownItemsNum = $author$project$PositiveInt$new(1000);
var $author$project$OutputStyle$defaultMaxDropdownItems = $author$project$OutputStyle$FixedMaxDropdownItems($author$project$OutputStyle$defaultMaxDropdownItemsNum);
var $author$project$OutputStyle$defaultSearchStringMinimumLength = $author$project$OutputStyle$FixedSearchStringMinimumLength(
	$author$project$PositiveInt$new(2));
var $author$project$SelectedValueEncoding$CommaSeperated = 0;
var $author$project$SelectedValueEncoding$defaultSelectedValueEncoding = 0;
var $author$project$OutputStyle$AllowLightDomChanges = 1;
var $author$project$OutputStyle$Collapsed = 1;
var $author$project$OutputStyle$NoCustomOptions = {$: 1};
var $author$project$OutputStyle$NoFooter = 0;
var $author$project$OutputStyle$NoLimitToDropdownItems = {$: 1};
var $author$project$OutputStyle$SelectedItemStaysInPlace = 0;
var $author$project$SelectionMode$SingleSelectConfig = F3(
	function (a, b, c) {
		return {$: 0, a: a, b: b, c: c};
	});
var $author$project$OutputStyle$SingleSelectCustomHtml = function (a) {
	return {$: 0, a: a};
};
var $author$project$SelectionMode$Unfocused = 1;
var $author$project$SelectionMode$defaultSelectionConfig = A3(
	$author$project$SelectionMode$SingleSelectConfig,
	$author$project$OutputStyle$SingleSelectCustomHtml(
		{
			T: $author$project$OutputStyle$NoCustomOptions,
			U: 1,
			V: 0,
			J: 1,
			bp: $author$project$OutputStyle$NoLimitToDropdownItems,
			bB: $author$project$OutputStyle$FixedSearchStringMinimumLength(
				$author$project$PositiveInt$new(2)),
			bC: 0
		}),
	_Utils_Tuple2(false, ''),
	1);
var $elm$core$List$filter = F2(
	function (isGood, list) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, xs) {
					return isGood(x) ? A2($elm$core$List$cons, x, xs) : xs;
				}),
			_List_Nil,
			list);
	});
var $author$project$OptionList$filter = F2(
	function (_function, optionList) {
		switch (optionList.$) {
			case 0:
				var options = optionList.a;
				return $author$project$OptionList$FancyOptionList(
					A2($elm$core$List$filter, _function, options));
			case 1:
				var options = optionList.a;
				return $author$project$OptionList$DatalistOptionList(
					A2($elm$core$List$filter, _function, options));
			default:
				var options = optionList.a;
				return $author$project$OptionList$SlottedOptionList(
					A2($elm$core$List$filter, _function, options));
		}
	});
var $author$project$SelectedValueEncoding$JsonEncoded = 1;
var $author$project$SelectedValueEncoding$fromMaybeString = function (maybeString) {
	if (!maybeString.$) {
		var string = maybeString.a;
		switch (string) {
			case 'json':
				return $elm$core$Result$Ok(1);
			case 'comma':
				return $elm$core$Result$Ok(0);
			default:
				return $elm$core$Result$Err('Invalid selected value encoding: ' + string);
		}
	} else {
		return $elm$core$Result$Ok($author$project$SelectedValueEncoding$defaultSelectedValueEncoding);
	}
};
var $elm$core$Maybe$andThen = F2(
	function (callback, maybeValue) {
		if (!maybeValue.$) {
			var value = maybeValue.a;
			return callback(value);
		} else {
			return $elm$core$Maybe$Nothing;
		}
	});
var $author$project$PositiveInt$fromString = function (str) {
	return A2(
		$elm$core$Maybe$andThen,
		$author$project$PositiveInt$maybeNew,
		$elm$core$String$toInt(str));
};
var $author$project$MuchSelect$getDebouceDelayForSearch = function (numberOfOptions) {
	return (numberOfOptions < 100) ? 1 : ((numberOfOptions < 1000) ? 100 : 1000);
};
var $author$project$SelectionMode$getEventMode = function (selectionConfig) {
	if (!selectionConfig.$) {
		var singleSelectOutputStyle = selectionConfig.a;
		if (!singleSelectOutputStyle.$) {
			var singleSelectCustomHtmlFields = singleSelectOutputStyle.a;
			return singleSelectCustomHtmlFields.J;
		} else {
			var eventsMode = singleSelectOutputStyle.a;
			return eventsMode;
		}
	} else {
		var multiSelectOutputStyle = selectionConfig.a;
		if (!multiSelectOutputStyle.$) {
			var multiSelectCustomHtmlFields = multiSelectOutputStyle.a;
			return multiSelectCustomHtmlFields.J;
		} else {
			var eventsMode = multiSelectOutputStyle.a;
			return eventsMode;
		}
	}
};
var $author$project$Option$getOptionValueAsString = function (option) {
	var _v0 = $author$project$Option$getOptionValue(option);
	if (!_v0.$) {
		var string = _v0.a;
		return string;
	} else {
		return '';
	}
};
var $author$project$SelectionMode$CustomHtml = 0;
var $author$project$SelectionMode$Datalist = 1;
var $author$project$SelectionMode$getOutputStyle = function (selectionConfig) {
	if (!selectionConfig.$) {
		var singleSelectOutputStyle = selectionConfig.a;
		if (!singleSelectOutputStyle.$) {
			return 0;
		} else {
			return 1;
		}
	} else {
		var multiSelectOutputStyle = selectionConfig.a;
		if (!multiSelectOutputStyle.$) {
			return 0;
		} else {
			return 1;
		}
	}
};
var $author$project$SelectionMode$MultiSelect = 1;
var $author$project$SelectionMode$SingleSelect = 0;
var $author$project$SelectionMode$getSelectionMode = function (selectionConfig) {
	if (!selectionConfig.$) {
		return 0;
	} else {
		return 1;
	}
};
var $author$project$OptionList$length = function (optionList) {
	switch (optionList.$) {
		case 0:
			var options = optionList.a;
			return $elm$core$List$length(options);
		case 1:
			var options = optionList.a;
			return $elm$core$List$length(options);
		default:
			var options = optionList.a;
			return $elm$core$List$length(options);
	}
};
var $author$project$OptionDisplay$getSelectedIndex = function (optionDisplay) {
	switch (optionDisplay.$) {
		case 0:
			return -1;
		case 1:
			return -1;
		case 2:
			var _int = optionDisplay.a;
			return _int;
		case 4:
			var _int = optionDisplay.a;
			return _int;
		case 3:
			var _int = optionDisplay.a;
			return _int;
		case 5:
			var _int = optionDisplay.a;
			return _int;
		case 6:
			return -1;
		case 8:
			return -1;
		default:
			return -1;
	}
};
var $author$project$DatalistOption$getOptionSelectedIndex = function (datalistOption) {
	return $author$project$OptionDisplay$getSelectedIndex(
		$author$project$DatalistOption$getOptionDisplay(datalistOption));
};
var $author$project$FancyOption$getOptionSelectedIndex = function (option) {
	return $author$project$OptionDisplay$getSelectedIndex(
		$author$project$FancyOption$getOptionDisplay(option));
};
var $author$project$SlottedOption$getOptionSelectedIndex = function (slottedOption) {
	return $author$project$OptionDisplay$getSelectedIndex(
		$author$project$SlottedOption$getOptionDisplay(slottedOption));
};
var $author$project$Option$getOptionSelectedIndex = function (option) {
	switch (option.$) {
		case 0:
			var fancyOption = option.a;
			return $author$project$FancyOption$getOptionSelectedIndex(fancyOption);
		case 1:
			var datalistOption = option.a;
			return $author$project$DatalistOption$getOptionSelectedIndex(datalistOption);
		default:
			var slottedOption = option.a;
			return $author$project$SlottedOption$getOptionSelectedIndex(slottedOption);
	}
};
var $author$project$OptionDisplay$isSelected = function (optionDisplay) {
	switch (optionDisplay.$) {
		case 0:
			return false;
		case 1:
			return false;
		case 2:
			return true;
		case 4:
			return true;
		case 3:
			return true;
		case 5:
			return true;
		case 6:
			return false;
		case 8:
			return false;
		default:
			return false;
	}
};
var $author$project$DatalistOption$isSelected = function (datalistOption) {
	return $author$project$OptionDisplay$isSelected(
		$author$project$DatalistOption$getOptionDisplay(datalistOption));
};
var $author$project$FancyOption$isSelected = function (fancyOption) {
	return $author$project$OptionDisplay$isSelected(
		$author$project$FancyOption$getOptionDisplay(fancyOption));
};
var $author$project$SlottedOption$isSelected = function (slottedOption) {
	return $author$project$OptionDisplay$isSelected(
		$author$project$SlottedOption$getOptionDisplay(slottedOption));
};
var $author$project$Option$isSelected = function (option) {
	switch (option.$) {
		case 0:
			var fancyOption = option.a;
			return $author$project$FancyOption$isSelected(fancyOption);
		case 1:
			var datalistOption = option.a;
			return $author$project$DatalistOption$isSelected(datalistOption);
		default:
			var slottedOption = option.a;
			return $author$project$SlottedOption$isSelected(slottedOption);
	}
};
var $elm$core$List$sortBy = _List_sortBy;
var $author$project$OptionList$sortBy = F2(
	function (_function, optionList) {
		switch (optionList.$) {
			case 0:
				var options = optionList.a;
				return $author$project$OptionList$FancyOptionList(
					A2($elm$core$List$sortBy, _function, options));
			case 1:
				var options = optionList.a;
				return $author$project$OptionList$DatalistOptionList(
					A2($elm$core$List$sortBy, _function, options));
			default:
				var options = optionList.a;
				return $author$project$OptionList$SlottedOptionList(
					A2($elm$core$List$sortBy, _function, options));
		}
	});
var $author$project$OptionList$selectedOptions = function (options) {
	return A2(
		$author$project$OptionList$sortBy,
		$author$project$Option$getOptionSelectedIndex,
		A2($author$project$OptionList$filter, $author$project$Option$isSelected, options));
};
var $author$project$OptionList$hasSelectedOption = function (optionList) {
	return function (length_) {
		return length_ > 0;
	}(
		$author$project$OptionList$length(
			$author$project$OptionList$selectedOptions(optionList)));
};
var $elm$core$List$head = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return $elm$core$Maybe$Just(x);
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $grotsev$elm_debouncer$Bounce$Bounce = $elm$core$Basics$identity;
var $grotsev$elm_debouncer$Bounce$init = 0;
var $author$project$DomStateCache$CustomOptionsAllowed = {$: 1};
var $author$project$DomStateCache$CustomOptionsAllowedWithHint = function (a) {
	return {$: 2, a: a};
};
var $author$project$DomStateCache$CustomOptionsNotAllowed = {$: 0};
var $author$project$DomStateCache$HasDisabledAttribute = 0;
var $author$project$DomStateCache$NoDisabledAttribute = 1;
var $author$project$DomStateCache$OutputStyleCustomHtml = 1;
var $author$project$DomStateCache$OutputStyleDatalist = 0;
var $author$project$OutputStyle$AllowCustomOptions = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $author$project$SelectionMode$getCustomOptions = function (selectionConfig) {
	if (!selectionConfig.$) {
		var singleSelectOutputStyle = selectionConfig.a;
		if (!singleSelectOutputStyle.$) {
			var singleSelectCustomHtmlFields = singleSelectOutputStyle.a;
			return singleSelectCustomHtmlFields.T;
		} else {
			var transformAndValidate = singleSelectOutputStyle.b;
			return A2($author$project$OutputStyle$AllowCustomOptions, $elm$core$Maybe$Nothing, transformAndValidate);
		}
	} else {
		var multiSelectOutputStyle = selectionConfig.a;
		if (!multiSelectOutputStyle.$) {
			var multiSelectCustomHtmlFields = multiSelectOutputStyle.a;
			return multiSelectCustomHtmlFields.T;
		} else {
			var transformAndValidate = multiSelectOutputStyle.b;
			return A2($author$project$OutputStyle$AllowCustomOptions, $elm$core$Maybe$Nothing, transformAndValidate);
		}
	}
};
var $author$project$SelectionMode$isDisabled = function (selectionConfig) {
	if (!selectionConfig.$) {
		var interactionState = selectionConfig.c;
		switch (interactionState) {
			case 0:
				return false;
			case 1:
				return false;
			default:
				return true;
		}
	} else {
		var interactionState = selectionConfig.c;
		switch (interactionState) {
			case 0:
				return false;
			case 1:
				return false;
			default:
				return true;
		}
	}
};
var $author$project$SelectionMode$initDomStateCache = function (selectionConfig) {
	return {
		a6: function () {
			var _v0 = $author$project$SelectionMode$getCustomOptions(selectionConfig);
			if (!_v0.$) {
				var maybeHint = _v0.a;
				if (!maybeHint.$) {
					var hint = maybeHint.a;
					return $author$project$DomStateCache$CustomOptionsAllowedWithHint(hint);
				} else {
					return $author$project$DomStateCache$CustomOptionsAllowed;
				}
			} else {
				return $author$project$DomStateCache$CustomOptionsNotAllowed;
			}
		}(),
		bd: $author$project$SelectionMode$isDisabled(selectionConfig) ? 0 : 1,
		bx: function () {
			var _v2 = $author$project$SelectionMode$getOutputStyle(selectionConfig);
			if (!_v2) {
				return 1;
			} else {
				return 0;
			}
		}()
	};
};
var $author$project$DatalistOption$isEmpty = function (datalistOption) {
	var optionValue = datalistOption.b;
	return _Utils_eq(optionValue, $author$project$OptionValue$EmptyOptionValue);
};
var $author$project$FancyOption$isEmptyOption = function (option) {
	switch (option.$) {
		case 0:
			return false;
		case 1:
			return false;
		default:
			return true;
	}
};
var $author$project$Option$isEmpty = function (option) {
	switch (option.$) {
		case 0:
			var fancyOption = option.a;
			return $author$project$FancyOption$isEmptyOption(fancyOption);
		case 1:
			var datalistOption = option.a;
			return $author$project$DatalistOption$isEmpty(datalistOption);
		default:
			return false;
	}
};
var $author$project$PositiveInt$isZero = function (_v0) {
	var positiveInt = _v0;
	return !positiveInt;
};
var $author$project$MuchSelect$ChangeTheLightDom = function (a) {
	return {$: 26, a: a};
};
var $author$project$MuchSelect$ReportInitialValueSet = function (a) {
	return {$: 20, a: a};
};
var $author$project$LightDomChange$UpdateSelectedValue = function (a) {
	return {$: 2, a: a};
};
var $elm$json$Json$Encode$object = function (pairs) {
	return _Json_wrap(
		A3(
			$elm$core$List$foldl,
			F2(
				function (_v0, obj) {
					var k = _v0.a;
					var v = _v0.b;
					return A3(_Json_addField, k, v, obj);
				}),
			_Json_emptyObject(0),
			pairs));
};
var $author$project$OptionList$getOptions = function (optionList) {
	switch (optionList.$) {
		case 0:
			var options = optionList.a;
			return options;
		case 1:
			var options = optionList.a;
			return options;
		default:
			var options = optionList.a;
			return options;
	}
};
var $elm$json$Json$Encode$list = F2(
	function (func, entries) {
		return _Json_wrap(
			A3(
				$elm$core$List$foldl,
				_Json_addEntry(func),
				_Json_emptyArray(0),
				entries));
	});
var $elm$json$Json$Encode$bool = _Json_wrap;
var $author$project$OptionLabel$new = function (string) {
	return A3($author$project$OptionLabel$OptionLabel, string, $elm$core$Maybe$Nothing, $author$project$SortRank$NoSortRank);
};
var $author$project$OptionValue$optionValueToString = function (optionValue) {
	if (!optionValue.$) {
		var valueString = optionValue.a;
		return valueString;
	} else {
		return '';
	}
};
var $author$project$DatalistOption$getOptionLabel = function (datalistOption) {
	var optionValue = datalistOption.b;
	return $author$project$OptionLabel$new(
		$author$project$OptionValue$optionValueToString(optionValue));
};
var $author$project$FancyOption$getOptionLabel = function (fancyOption) {
	switch (fancyOption.$) {
		case 0:
			var optionLabel = fancyOption.b;
			return optionLabel;
		case 1:
			var optionLabel = fancyOption.b;
			return optionLabel;
		default:
			var optionLabel = fancyOption.b;
			return optionLabel;
	}
};
var $author$project$Option$getOptionLabel = function (option) {
	switch (option.$) {
		case 0:
			var fancyOption = option.a;
			return $author$project$FancyOption$getOptionLabel(fancyOption);
		case 1:
			var datalistOption = option.a;
			return $author$project$DatalistOption$getOptionLabel(datalistOption);
		default:
			return $author$project$OptionLabel$new('');
	}
};
var $elm$json$Json$Encode$int = _Json_wrap;
var $author$project$Option$getOptionDisplay = function (option) {
	switch (option.$) {
		case 0:
			var fancyOption = option.a;
			return $author$project$FancyOption$getOptionDisplay(fancyOption);
		case 1:
			var datalistOption = option.a;
			return $author$project$DatalistOption$getOptionDisplay(datalistOption);
		default:
			var slottedOption = option.a;
			return $author$project$SlottedOption$getOptionDisplay(slottedOption);
	}
};
var $author$project$OptionDisplay$isInvalid = function (optionDisplay) {
	switch (optionDisplay.$) {
		case 0:
			return false;
		case 1:
			return false;
		case 2:
			return false;
		case 4:
			return false;
		case 3:
			return true;
		case 5:
			return false;
		case 6:
			return false;
		case 8:
			return false;
		default:
			return false;
	}
};
var $author$project$Option$isInvalid = function (option) {
	return $author$project$OptionDisplay$isInvalid(
		$author$project$Option$getOptionDisplay(option));
};
var $author$project$OptionDisplay$isPendingValidation = function (optionDisplay) {
	switch (optionDisplay.$) {
		case 0:
			return false;
		case 1:
			return false;
		case 2:
			return false;
		case 4:
			return true;
		case 3:
			return false;
		case 5:
			return false;
		case 6:
			return false;
		case 8:
			return false;
		default:
			return false;
	}
};
var $author$project$Option$isPendingValidation = function (option) {
	return $author$project$OptionDisplay$isPendingValidation(
		$author$project$Option$getOptionDisplay(option));
};
var $author$project$Option$isValid = function (option) {
	return !($author$project$Option$isInvalid(option) || $author$project$Option$isPendingValidation(option));
};
var $author$project$OptionLabel$optionLabelToString = function (optionLabel) {
	var label = optionLabel.a;
	return label;
};
var $elm$json$Json$Encode$string = _Json_wrap;
var $author$project$Ports$optionEncoder = function (option) {
	return $elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'value',
				$elm$json$Json$Encode$string(
					$author$project$Option$getOptionValueAsString(option))),
				_Utils_Tuple2(
				'label',
				$elm$json$Json$Encode$string(
					$author$project$OptionLabel$optionLabelToString(
						$author$project$Option$getOptionLabel(option)))),
				_Utils_Tuple2(
				'isValid',
				$elm$json$Json$Encode$bool(
					$author$project$Option$isValid(option))),
				_Utils_Tuple2(
				'selectedIndex',
				$elm$json$Json$Encode$int(
					$author$project$Option$getOptionSelectedIndex(option)))
			]));
};
var $author$project$Ports$optionsEncoder = function (optionList) {
	return A2(
		$elm$json$Json$Encode$list,
		$author$project$Ports$optionEncoder,
		$author$project$OptionList$getOptions(optionList));
};
var $author$project$OptionList$andMap = F2(
	function (_function, optionList) {
		switch (optionList.$) {
			case 0:
				var options = optionList.a;
				return A2($elm$core$List$map, _function, options);
			case 1:
				var options = optionList.a;
				return A2($elm$core$List$map, _function, options);
			default:
				var options = optionList.a;
				return A2($elm$core$List$map, _function, options);
		}
	});
var $elm_community$list_extra$List$Extra$find = F2(
	function (predicate, list) {
		find:
		while (true) {
			if (!list.b) {
				return $elm$core$Maybe$Nothing;
			} else {
				var first = list.a;
				var rest = list.b;
				if (predicate(first)) {
					return $elm$core$Maybe$Just(first);
				} else {
					var $temp$predicate = predicate,
						$temp$list = rest;
					predicate = $temp$predicate;
					list = $temp$list;
					continue find;
				}
			}
		}
	});
var $author$project$OptionList$find = F2(
	function (_function, optionList) {
		switch (optionList.$) {
			case 0:
				var options = optionList.a;
				return A2($elm_community$list_extra$List$Extra$find, _function, options);
			case 1:
				var options = optionList.a;
				return A2($elm_community$list_extra$List$Extra$find, _function, options);
			default:
				var options = optionList.a;
				return A2($elm_community$list_extra$List$Extra$find, _function, options);
		}
	});
var $author$project$OptionList$findSelectedOption = function (optionList) {
	return A2($author$project$OptionList$find, $author$project$Option$isSelected, optionList);
};
var $elm$url$Url$percentEncode = _Url_percentEncode;
var $author$project$SelectedValueEncoding$rawSelectedValue = F3(
	function (selectionMode, selectedValueEncoding, optionList) {
		if (!selectionMode) {
			var _v1 = $author$project$OptionList$findSelectedOption(optionList);
			if (!_v1.$) {
				var selectedOption = _v1.a;
				var valueAsString = $author$project$Option$getOptionValueAsString(selectedOption);
				if (selectedValueEncoding === 1) {
					return $elm$json$Json$Encode$string(
						$elm$url$Url$percentEncode(
							A2(
								$elm$json$Json$Encode$encode,
								0,
								$elm$json$Json$Encode$string(valueAsString))));
				} else {
					return $elm$json$Json$Encode$string(valueAsString);
				}
			} else {
				if (selectedValueEncoding === 1) {
					return $elm$json$Json$Encode$string(
						$elm$url$Url$percentEncode(
							A2(
								$elm$json$Json$Encode$encode,
								0,
								$elm$json$Json$Encode$string(''))));
				} else {
					return $elm$json$Json$Encode$string('');
				}
			}
		} else {
			var selectedValues = A2(
				$author$project$OptionList$andMap,
				$author$project$Option$getOptionValueAsString,
				$author$project$OptionList$selectedOptions(optionList));
			if (selectedValueEncoding === 1) {
				return $elm$json$Json$Encode$string(
					$elm$url$Url$percentEncode(
						A2(
							$elm$json$Json$Encode$encode,
							0,
							A2($elm$json$Json$Encode$list, $elm$json$Json$Encode$string, selectedValues))));
			} else {
				return $elm$json$Json$Encode$string(
					A2($elm$core$String$join, ',', selectedValues));
			}
		}
	});
var $author$project$SelectedValueEncoding$selectedValue = F2(
	function (selectionMode, optionList) {
		if (!selectionMode) {
			var _v1 = $author$project$OptionList$findSelectedOption(optionList);
			if (!_v1.$) {
				var selectedOption = _v1.a;
				var valueAsString = $author$project$Option$getOptionValueAsString(selectedOption);
				return $elm$json$Json$Encode$string(valueAsString);
			} else {
				return $elm$json$Json$Encode$string('');
			}
		} else {
			var selectedValues = A2(
				$author$project$OptionList$andMap,
				$author$project$Option$getOptionValueAsString,
				$author$project$OptionList$selectedOptions(optionList));
			return A2($elm$json$Json$Encode$list, $elm$json$Json$Encode$string, selectedValues);
		}
	});
var $author$project$MuchSelect$makeEffectsForInitialValue = F4(
	function (eventsMode, selectionMode, selectedValueEncoding, selectedOptionList) {
		if (!eventsMode) {
			return $author$project$MuchSelect$ReportInitialValueSet(
				$author$project$Ports$optionsEncoder(selectedOptionList));
		} else {
			return $author$project$MuchSelect$Batch(
				_List_fromArray(
					[
						$author$project$MuchSelect$ReportInitialValueSet(
						$author$project$Ports$optionsEncoder(selectedOptionList)),
						$author$project$MuchSelect$ChangeTheLightDom(
						$author$project$LightDomChange$UpdateSelectedValue(
							$elm$json$Json$Encode$object(
								_List_fromArray(
									[
										_Utils_Tuple2(
										'rawValue',
										A3($author$project$SelectedValueEncoding$rawSelectedValue, selectionMode, selectedValueEncoding, selectedOptionList)),
										_Utils_Tuple2(
										'value',
										A2($author$project$SelectedValueEncoding$selectedValue, selectionMode, selectedOptionList)),
										_Utils_Tuple2(
										'selectionMode',
										function () {
											if (!selectionMode) {
												return $elm$json$Json$Encode$string('single-select');
											} else {
												return $elm$json$Json$Encode$string('multi-select');
											}
										}())
									]))))
					]));
		}
	});
var $author$project$SelectionMode$Disabled = 2;
var $author$project$SelectionMode$MultiSelectConfig = F3(
	function (a, b, c) {
		return {$: 1, a: a, b: b, c: c};
	});
var $elm$core$Result$andThen = F2(
	function (callback, result) {
		if (!result.$) {
			var value = result.a;
			return callback(value);
		} else {
			var msg = result.a;
			return $elm$core$Result$Err(msg);
		}
	});
var $author$project$OutputStyle$DisableSingleItemRemoval = 1;
var $author$project$OutputStyle$EnableSingleItemRemoval = 0;
var $author$project$OutputStyle$EventsOnly = 0;
var $author$project$OutputStyle$MultiSelectCustomHtml = function (a) {
	return {$: 0, a: a};
};
var $author$project$OutputStyle$MultiSelectDataList = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var $author$project$OutputStyle$ShowFooter = 1;
var $author$project$SelectionMode$makeMultiSelectOutputStyle = F9(
	function (outputStyle, isEventsOnly_, allowCustomOptions, enableMultiSelectSingleItemRemoval, maxDropdownItems, searchStringMinimumLength, shouldShowDropdownFooter, customOptionHint, transformAndValidate) {
		if (!outputStyle) {
			var singleItemRemoval = enableMultiSelectSingleItemRemoval ? 0 : 1;
			var eventsMode = isEventsOnly_ ? 0 : 1;
			var dropdownStyle = shouldShowDropdownFooter ? 1 : 0;
			var customOptions = allowCustomOptions ? A2($author$project$OutputStyle$AllowCustomOptions, customOptionHint, transformAndValidate) : $author$project$OutputStyle$NoCustomOptions;
			return $elm$core$Result$Ok(
				$author$project$OutputStyle$MultiSelectCustomHtml(
					{T: customOptions, U: 1, V: dropdownStyle, J: eventsMode, bp: maxDropdownItems, bB: searchStringMinimumLength, bH: singleItemRemoval}));
		} else {
			var eventsMode = isEventsOnly_ ? 0 : 1;
			return $elm$core$Result$Ok(
				A2($author$project$OutputStyle$MultiSelectDataList, eventsMode, transformAndValidate));
		}
	});
var $author$project$OutputStyle$SelectedItemMovesToTheTop = 1;
var $author$project$OutputStyle$SingleSelectDatalist = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var $author$project$SelectionMode$makeSingleSelectOutputStyle = F9(
	function (outputStyle, isEventsOnly_, allowCustomOptions, selectedItemStaysInPlace, maxDropdownItems, searchStringMinimumLength, shouldShowDropdownFooter, customOptionHint, transformAndValidate) {
		if (!outputStyle) {
			var selectedItemPlacementMode = selectedItemStaysInPlace ? 0 : 1;
			var eventsMode = isEventsOnly_ ? 0 : 1;
			var dropdownStyle = shouldShowDropdownFooter ? 1 : 0;
			var customOptions = allowCustomOptions ? A2($author$project$OutputStyle$AllowCustomOptions, customOptionHint, transformAndValidate) : $author$project$OutputStyle$NoCustomOptions;
			return $elm$core$Result$Ok(
				$author$project$OutputStyle$SingleSelectCustomHtml(
					{T: customOptions, U: 1, V: dropdownStyle, J: eventsMode, bp: maxDropdownItems, bB: searchStringMinimumLength, bC: selectedItemPlacementMode}));
		} else {
			var eventsMode = isEventsOnly_ ? 0 : 1;
			return $elm$core$Result$Ok(
				A2($author$project$OutputStyle$SingleSelectDatalist, eventsMode, transformAndValidate));
		}
	});
var $elm$core$Result$map = F2(
	function (func, ra) {
		if (!ra.$) {
			var a = ra.a;
			return $elm$core$Result$Ok(
				func(a));
		} else {
			var e = ra.a;
			return $elm$core$Result$Err(e);
		}
	});
var $author$project$SelectionMode$stringToOutputStyle = function (string) {
	switch (string) {
		case 'customHtml':
			return $elm$core$Result$Ok(0);
		case 'custom-html':
			return $elm$core$Result$Ok(0);
		case 'datalist':
			return $elm$core$Result$Ok(1);
		case '':
			return $elm$core$Result$Ok(0);
		default:
			return $elm$core$Result$Err('Invalid output style');
	}
};
var $author$project$SelectionMode$makeSelectionConfig = function (isEventsOnly_) {
	return function (disabled) {
		return function (allowMultiSelect) {
			return function (allowCustomOptions) {
				return function (outputStyle) {
					return function (placeholder) {
						return function (customOptionHint) {
							return function (enableMultiSelectSingleItemRemoval) {
								return function (maxDropdownItems) {
									return function (selectedItemStaysInPlace) {
										return function (searchStringMinimumLength) {
											return function (shouldShowDropdownFooter) {
												return function (transformAndValidate) {
													var outputStyleResult = $author$project$SelectionMode$stringToOutputStyle(outputStyle);
													var interactionState = disabled ? 2 : 1;
													return A2(
														$elm$core$Result$andThen,
														function (s) {
															if (allowMultiSelect) {
																var styleResult = A9($author$project$SelectionMode$makeMultiSelectOutputStyle, s, isEventsOnly_, allowCustomOptions, enableMultiSelectSingleItemRemoval, maxDropdownItems, searchStringMinimumLength, shouldShowDropdownFooter, customOptionHint, transformAndValidate);
																return A2(
																	$elm$core$Result$map,
																	function (style_) {
																		return A3($author$project$SelectionMode$MultiSelectConfig, style_, placeholder, interactionState);
																	},
																	styleResult);
															} else {
																var styleResult = A9($author$project$SelectionMode$makeSingleSelectOutputStyle, s, isEventsOnly_, allowCustomOptions, selectedItemStaysInPlace, maxDropdownItems, searchStringMinimumLength, shouldShowDropdownFooter, customOptionHint, transformAndValidate);
																return A2(
																	$elm$core$Result$map,
																	function (style_) {
																		return A3($author$project$SelectionMode$SingleSelectConfig, style_, placeholder, interactionState);
																	},
																	styleResult);
															}
														},
														outputStyleResult);
												};
											};
										};
									};
								};
							};
						};
					};
				};
			};
		};
	};
};
var $author$project$OptionDisplay$deselect = function (optionDisplay) {
	switch (optionDisplay.$) {
		case 0:
			return optionDisplay;
		case 1:
			return optionDisplay;
		case 2:
			var age = optionDisplay.b;
			return $author$project$OptionDisplay$OptionShown(age);
		case 4:
			return $author$project$OptionDisplay$OptionShown(1);
		case 3:
			return $author$project$OptionDisplay$OptionShown(1);
		case 5:
			return $author$project$OptionDisplay$OptionShown(1);
		case 6:
			return optionDisplay;
		case 8:
			return optionDisplay;
		default:
			return $author$project$OptionDisplay$OptionShown(1);
	}
};
var $author$project$DatalistOption$deselect = function (option) {
	return A2(
		$author$project$DatalistOption$setOptionDisplay,
		$author$project$OptionDisplay$deselect(
			$author$project$DatalistOption$getOptionDisplay(option)),
		option);
};
var $author$project$FancyOption$deselect = function (option) {
	return A2(
		$author$project$FancyOption$setOptionDisplay,
		$author$project$OptionDisplay$deselect(
			$author$project$FancyOption$getOptionDisplay(option)),
		option);
};
var $author$project$SlottedOption$deselect = function (option) {
	return A2(
		$author$project$SlottedOption$setOptionDisplay,
		$author$project$OptionDisplay$deselect(
			$author$project$SlottedOption$getOptionDisplay(option)),
		option);
};
var $author$project$Option$deselect = function (option) {
	switch (option.$) {
		case 0:
			var fancyOption = option.a;
			return $author$project$Option$FancyOption(
				$author$project$FancyOption$deselect(fancyOption));
		case 1:
			var datalistOption = option.a;
			return $author$project$Option$DatalistOption(
				$author$project$DatalistOption$deselect(datalistOption));
		default:
			var slottedOption = option.a;
			return $author$project$Option$SlottedOption(
				$author$project$SlottedOption$deselect(slottedOption));
	}
};
var $author$project$OptionList$indexedMap = F2(
	function (_function, optionList) {
		switch (optionList.$) {
			case 0:
				var options = optionList.a;
				return $author$project$OptionList$FancyOptionList(
					A2($elm$core$List$indexedMap, _function, options));
			case 1:
				var options = optionList.a;
				return $author$project$OptionList$DatalistOptionList(
					A2($elm$core$List$indexedMap, _function, options));
			default:
				var options = optionList.a;
				return $author$project$OptionList$SlottedOptionList(
					A2($elm$core$List$indexedMap, _function, options));
		}
	});
var $author$project$OptionList$unselectedOptions = function (options) {
	return A2(
		$author$project$OptionList$filter,
		function (option) {
			return !$author$project$Option$isSelected(option);
		},
		options);
};
var $author$project$OptionList$reIndexSelectedOptions = function (optionList) {
	var selectedOptions_ = $author$project$OptionList$selectedOptions(optionList);
	var nonSelectedOptions = $author$project$OptionList$unselectedOptions(optionList);
	return A2(
		$author$project$OptionList$append,
		A2(
			$author$project$OptionList$indexedMap,
			F2(
				function (index, option) {
					return A2($author$project$Option$select, index, option);
				}),
			selectedOptions_),
		nonSelectedOptions);
};
var $author$project$OptionList$removeEmptyOptions = function (optionList) {
	return A2(
		$author$project$OptionList$filter,
		A2($elm$core$Basics$composeR, $author$project$Option$isEmpty, $elm$core$Basics$not),
		optionList);
};
var $elm$core$List$member = F2(
	function (x, xs) {
		return A2(
			$elm$core$List$any,
			function (a) {
				return _Utils_eq(a, x);
			},
			xs);
	});
var $elm_community$list_extra$List$Extra$uniqueHelp = F4(
	function (f, existing, remaining, accumulator) {
		uniqueHelp:
		while (true) {
			if (!remaining.b) {
				return $elm$core$List$reverse(accumulator);
			} else {
				var first = remaining.a;
				var rest = remaining.b;
				var computedFirst = f(first);
				if (A2($elm$core$List$member, computedFirst, existing)) {
					var $temp$f = f,
						$temp$existing = existing,
						$temp$remaining = rest,
						$temp$accumulator = accumulator;
					f = $temp$f;
					existing = $temp$existing;
					remaining = $temp$remaining;
					accumulator = $temp$accumulator;
					continue uniqueHelp;
				} else {
					var $temp$f = f,
						$temp$existing = A2($elm$core$List$cons, computedFirst, existing),
						$temp$remaining = rest,
						$temp$accumulator = A2($elm$core$List$cons, first, accumulator);
					f = $temp$f;
					existing = $temp$existing;
					remaining = $temp$remaining;
					accumulator = $temp$accumulator;
					continue uniqueHelp;
				}
			}
		}
	});
var $elm_community$list_extra$List$Extra$uniqueBy = F2(
	function (f, list) {
		return A4($elm_community$list_extra$List$Extra$uniqueHelp, f, _List_Nil, list, _List_Nil);
	});
var $author$project$OptionList$uniqueBy = F2(
	function (_function, optionList) {
		switch (optionList.$) {
			case 0:
				var options = optionList.a;
				return $author$project$OptionList$FancyOptionList(
					A2($elm_community$list_extra$List$Extra$uniqueBy, _function, options));
			case 1:
				var options = optionList.a;
				return $author$project$OptionList$DatalistOptionList(
					A2($elm_community$list_extra$List$Extra$uniqueBy, _function, options));
			default:
				var options = optionList.a;
				return $author$project$OptionList$SlottedOptionList(
					A2($elm_community$list_extra$List$Extra$uniqueBy, _function, options));
		}
	});
var $author$project$OptionList$organizeNewDatalistOptions = function (optionList) {
	var selectedOptions_ = $author$project$OptionList$selectedOptions(optionList);
	var optionsForTheDatasetHints = $author$project$OptionList$removeEmptyOptions(
		A2(
			$author$project$OptionList$uniqueBy,
			$author$project$Option$getOptionValueAsString,
			A2(
				$author$project$OptionList$map,
				$author$project$Option$deselect,
				A2(
					$author$project$OptionList$filter,
					A2($elm$core$Basics$composeR, $author$project$Option$isSelected, $elm$core$Basics$not),
					optionList))));
	return $author$project$OptionList$reIndexSelectedOptions(
		A2($author$project$OptionList$append, selectedOptions_, optionsForTheDatasetHints));
};
var $author$project$SearchString$SearchString = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $author$project$SearchString$reset = A2($author$project$SearchString$SearchString, '', true);
var $author$project$Option$optionsHaveEqualValues = F2(
	function (a, b) {
		return A2(
			$author$project$OptionValue$equals,
			$author$project$Option$getOptionValue(a),
			$author$project$Option$getOptionValue(b));
	});
var $author$project$OptionList$deselectEveryOptionExceptOptionsInList = F2(
	function (optionsNotToDeselect, optionList) {
		return A2(
			$author$project$OptionList$map,
			function (option) {
				var test = function (optionNotToDeselect) {
					return A2($author$project$Option$optionsHaveEqualValues, optionNotToDeselect, option);
				};
				return A2($elm$core$List$any, test, optionsNotToDeselect) ? option : $author$project$Option$deselect(option);
			},
			optionList);
	});
var $author$project$Option$isValueInListOfStrings = F2(
	function (possibleValues, option) {
		return A2(
			$elm$core$List$any,
			function (possibleValue) {
				return _Utils_eq(
					$author$project$Option$getOptionValueAsString(option),
					possibleValue);
			},
			possibleValues);
	});
var $elm_community$list_extra$List$Extra$mapAccuml = F3(
	function (f, acc0, list) {
		var _v0 = A3(
			$elm$core$List$foldl,
			F2(
				function (x, _v1) {
					var acc1 = _v1.a;
					var ys = _v1.b;
					var _v2 = A2(f, acc1, x);
					var acc2 = _v2.a;
					var y = _v2.b;
					return _Utils_Tuple2(
						acc2,
						A2($elm$core$List$cons, y, ys));
				}),
			_Utils_Tuple2(acc0, _List_Nil),
			list);
		var accFinal = _v0.a;
		var generatedList = _v0.b;
		return _Utils_Tuple2(
			accFinal,
			$elm$core$List$reverse(generatedList));
	});
var $author$project$OptionList$selectOptions = F2(
	function (optionsToSelect, optionList) {
		var helper = F2(
			function (newOptions, optionToSelect) {
				var selectionIndex = ($author$project$Option$getOptionSelectedIndex(optionToSelect) < 0) ? 0 : $author$project$Option$getOptionSelectedIndex(optionToSelect);
				return _Utils_Tuple2(
					A3(
						$author$project$OptionList$selectOptionByOptionValueWithIndex,
						selectionIndex,
						$author$project$Option$getOptionValue(optionToSelect),
						newOptions),
					_List_Nil);
			});
		return A3($elm_community$list_extra$List$Extra$mapAccuml, helper, optionList, optionsToSelect).a;
	});
var $author$project$OptionList$selectOptionsInOptionsListByString = F2(
	function (strings, options) {
		var optionsToSelect = $author$project$OptionList$getOptions(
			A2(
				$author$project$OptionList$filter,
				$author$project$Option$isValueInListOfStrings(strings),
				options));
		return A2(
			$author$project$OptionList$deselectEveryOptionExceptOptionsInList,
			optionsToSelect,
			A2($author$project$OptionList$selectOptions, optionsToSelect, options));
	});
var $author$project$PositiveInt$toInt = function (positiveInt) {
	var _int = positiveInt;
	return _int;
};
var $author$project$SortRank$getAutoIndexForSorting = function (sortRank) {
	switch (sortRank.$) {
		case 0:
			var positiveInt = sortRank.a;
			return $author$project$PositiveInt$toInt(positiveInt);
		case 1:
			var manualInt = sortRank.a;
			return $author$project$PositiveInt$toInt(manualInt);
		default:
			return 100000000;
	}
};
var $author$project$OptionLabel$getSortRank = function (optionLabel) {
	var sortRank = optionLabel.c;
	return sortRank;
};
var $author$project$OptionList$sort = F2(
	function (sorting, optionList) {
		switch (optionList.$) {
			case 0:
				var options = optionList.a;
				if (!sorting) {
					return $author$project$OptionList$FancyOptionList(
						A2(
							$elm$core$List$sortBy,
							A2(
								$elm$core$Basics$composeR,
								$author$project$Option$getOptionLabel,
								A2($elm$core$Basics$composeR, $author$project$OptionLabel$getSortRank, $author$project$SortRank$getAutoIndexForSorting)),
							options));
				} else {
					return $author$project$OptionList$FancyOptionList(
						A2(
							$elm$core$List$sortBy,
							A2($elm$core$Basics$composeR, $author$project$Option$getOptionLabel, $author$project$OptionLabel$optionLabelToString),
							options));
				}
			case 1:
				var options = optionList.a;
				if (!sorting) {
					return $author$project$OptionList$DatalistOptionList(
						A2(
							$elm$core$List$sortBy,
							A2(
								$elm$core$Basics$composeR,
								$author$project$Option$getOptionLabel,
								A2($elm$core$Basics$composeR, $author$project$OptionLabel$getSortRank, $author$project$SortRank$getAutoIndexForSorting)),
							options));
				} else {
					return $author$project$OptionList$DatalistOptionList(
						A2(
							$elm$core$List$sortBy,
							A2($elm$core$Basics$composeR, $author$project$Option$getOptionLabel, $author$project$OptionLabel$optionLabelToString),
							options));
				}
			default:
				var options = optionList.a;
				if (!sorting) {
					return $author$project$OptionList$SlottedOptionList(
						A2(
							$elm$core$List$sortBy,
							A2(
								$elm$core$Basics$composeR,
								$author$project$Option$getOptionLabel,
								A2($elm$core$Basics$composeR, $author$project$OptionLabel$getSortRank, $author$project$SortRank$getAutoIndexForSorting)),
							options));
				} else {
					return $author$project$OptionList$SlottedOptionList(
						A2(
							$elm$core$List$sortBy,
							A2($elm$core$Basics$composeR, $author$project$Option$getOptionLabel, $author$project$OptionLabel$optionLabelToString),
							options));
				}
		}
	});
var $author$project$PositiveInt$lessThan = F2(
	function (_v0, _v1) {
		var a = _v0;
		var b = _v1;
		return _Utils_cmp(a, b) < 0;
	});
var $author$project$OutputStyle$minimMaxDropdownItemsNum = $author$project$PositiveInt$new(2);
var $author$project$OutputStyle$stringToMaxDropdownItems = function (str) {
	var _v0 = $author$project$PositiveInt$fromString(str);
	if (!_v0.$) {
		var _int = _v0.a;
		return $author$project$PositiveInt$isZero(_int) ? $elm$core$Result$Ok($author$project$OutputStyle$NoLimitToDropdownItems) : (A2($author$project$PositiveInt$lessThan, _int, $author$project$OutputStyle$minimMaxDropdownItemsNum) ? $elm$core$Result$Err('Invalid value for the max-dropdown-items attribute. It needs to be greater than 2') : $elm$core$Result$Ok(
			$author$project$OutputStyle$FixedMaxDropdownItems(_int)));
	} else {
		return $elm$core$Result$Err('Invalid value for the max-dropdown-items attribute.');
	}
};
var $author$project$OptionSorting$SortByOptionLabel = 1;
var $author$project$OptionSorting$stringToOptionSort = function (string) {
	switch (string) {
		case 'no-sorting':
			return $elm$core$Result$Ok(0);
		case 'by-option-label':
			return $elm$core$Result$Ok(1);
		default:
			return $elm$core$Result$Err('Sorting the options by \"' + (string + '\" is not supported'));
	}
};
var $elm$core$Result$fromMaybe = F2(
	function (err, maybe) {
		if (!maybe.$) {
			var v = maybe.a;
			return $elm$core$Result$Ok(v);
		} else {
			return $elm$core$Result$Err(err);
		}
	});
var $elm$core$Result$mapError = F2(
	function (f, result) {
		if (!result.$) {
			var v = result.a;
			return $elm$core$Result$Ok(v);
		} else {
			var e = result.a;
			return $elm$core$Result$Err(
				f(e));
		}
	});
var $elm$url$Url$percentDecode = _Url_percentDecode;
var $elm$core$List$singleton = function (value) {
	return _List_fromArray(
		[value]);
};
var $author$project$Ports$valueDecoder = $elm$json$Json$Decode$oneOf(
	_List_fromArray(
		[
			A2($elm$json$Json$Decode$map, $elm$core$List$singleton, $elm$json$Json$Decode$string),
			A2(
			$elm$json$Json$Decode$andThen,
			function (listOfString) {
				if (listOfString.b && (!listOfString.b.b)) {
					return $elm$json$Json$Decode$succeed(listOfString);
				} else {
					return $elm$json$Json$Decode$fail('Only 1 value is allowed when in single select mode.');
				}
			},
			$elm$json$Json$Decode$list($elm$json$Json$Decode$string)),
			$elm$json$Json$Decode$null(_List_Nil)
		]));
var $author$project$Ports$valuesDecoder = $elm$json$Json$Decode$oneOf(
	_List_fromArray(
		[
			$elm$json$Json$Decode$list($elm$json$Json$Decode$string),
			A2($elm$json$Json$Decode$map, $elm$core$List$singleton, $elm$json$Json$Decode$string)
		]));
var $author$project$SelectedValueEncoding$stringToValueStrings = F2(
	function (selectedValueEncoding, valuesString) {
		if ((valuesString === '') && (!selectedValueEncoding)) {
			return $elm$core$Result$Ok(_List_Nil);
		} else {
			if ((valuesString === '') && (selectedValueEncoding === 1)) {
				return $elm$core$Result$Ok(_List_Nil);
			} else {
				if (!selectedValueEncoding) {
					return $elm$core$Result$Ok(
						A2($elm$core$String$split, ',', valuesString));
				} else {
					return A2(
						$elm$core$Result$andThen,
						function (decodedValueString) {
							return A2(
								$elm$core$Result$mapError,
								function (error) {
									return $elm$json$Json$Decode$errorToString(error);
								},
								A2(
									$elm$json$Json$Decode$decodeString,
									$elm$json$Json$Decode$oneOf(
										_List_fromArray(
											[$author$project$Ports$valuesDecoder, $author$project$Ports$valueDecoder])),
									decodedValueString));
						},
						A2(
							$elm$core$Result$fromMaybe,
							'Unable to do a percent decode on the selected value',
							$elm$url$Url$percentDecode(valuesString)));
				}
			}
		}
	});
var $author$project$RightSlot$ShowAddAndRemoveButtons = {$: 5};
var $author$project$RightSlot$ShowAddButton = {$: 4};
var $author$project$OptionValue$isEmpty = function (optionValue) {
	if (!optionValue.$) {
		return false;
	} else {
		return true;
	}
};
var $author$project$RightSlot$updateRightSlotForDatalist = function (selectedOptions) {
	var showRemoveButtons = $author$project$OptionList$length(selectedOptions) > 1;
	var showAddButtons = A2(
		$author$project$OptionList$any,
		function (option) {
			return !$author$project$OptionValue$isEmpty(
				$author$project$Option$getOptionValue(option));
		},
		selectedOptions);
	return (showAddButtons && (!showRemoveButtons)) ? $author$project$RightSlot$ShowAddButton : ((showAddButtons && showRemoveButtons) ? $author$project$RightSlot$ShowAddAndRemoveButtons : $author$project$RightSlot$ShowNothing);
};
var $elm$core$Result$withDefault = F2(
	function (def, result) {
		if (!result.$) {
			var a = result.a;
			return a;
		} else {
			return def;
		}
	});
var $author$project$MuchSelect$init = function (flags) {
	var selectedValueEncoding = A2(
		$elm$core$Result$withDefault,
		$author$project$SelectedValueEncoding$defaultSelectedValueEncoding,
		$author$project$SelectedValueEncoding$fromMaybeString(flags.h));
	var _v0 = function () {
		var _v1 = $author$project$TransformAndValidate$decode(flags.bL);
		if (!_v1.$) {
			var value = _v1.a;
			return _Utils_Tuple2(value, $author$project$MuchSelect$NoEffect);
		} else {
			var error = _v1.a;
			return _Utils_Tuple2(
				$author$project$TransformAndValidate$empty,
				$author$project$MuchSelect$ReportErrorMessage(
					$elm$json$Json$Decode$errorToString(error)));
		}
	}();
	var valueTransformationAndValidation = _v0.a;
	var valueTransformationAndValidationErrorEffect = _v0.b;
	var _v2 = function () {
		var _v3 = flags.bB;
		if (!_v3.$) {
			var str = _v3.a;
			var _v4 = $author$project$PositiveInt$fromString(str);
			if (!_v4.$) {
				var _int = _v4.a;
				return $author$project$PositiveInt$isZero(_int) ? _Utils_Tuple2($author$project$OutputStyle$NoMinimumToSearchStringLength, $author$project$MuchSelect$NoEffect) : _Utils_Tuple2(
					$author$project$OutputStyle$FixedSearchStringMinimumLength(_int),
					$author$project$MuchSelect$NoEffect);
			} else {
				return _Utils_Tuple2(
					$author$project$OutputStyle$defaultSearchStringMinimumLength,
					$author$project$MuchSelect$ReportErrorMessage('Invalid value for the search-string-minimum-length attribute.'));
			}
		} else {
			return _Utils_Tuple2($author$project$OutputStyle$defaultSearchStringMinimumLength, $author$project$MuchSelect$NoEffect);
		}
	}();
	var searchStringMinimumLength = _v2.a;
	var searchStringMinimumLengthErrorEffect = _v2.b;
	var _v5 = function () {
		var _v6 = $author$project$OptionSorting$stringToOptionSort(flags.M);
		if (!_v6.$) {
			var optionSort_ = _v6.a;
			return _Utils_Tuple2(optionSort_, $author$project$MuchSelect$NoEffect);
		} else {
			var error = _v6.a;
			return _Utils_Tuple2(
				0,
				$author$project$MuchSelect$ReportErrorMessage(error));
		}
	}();
	var optionSort = _v5.a;
	var optionSortErrorEffect = _v5.b;
	var _v7 = function () {
		var _v8 = flags.bp;
		if (!_v8.$) {
			var str = _v8.a;
			var _v9 = $author$project$OutputStyle$stringToMaxDropdownItems(str);
			if (!_v9.$) {
				var value = _v9.a;
				return _Utils_Tuple2(value, $author$project$MuchSelect$NoEffect);
			} else {
				var error = _v9.a;
				return _Utils_Tuple2(
					$author$project$OutputStyle$defaultMaxDropdownItems,
					$author$project$MuchSelect$ReportErrorMessage(error));
			}
		} else {
			return _Utils_Tuple2($author$project$OutputStyle$defaultMaxDropdownItems, $author$project$MuchSelect$NoEffect);
		}
	}();
	var maxDropdownItems = _v7.a;
	var maxDropdownItemsErrorEffect = _v7.b;
	var _v10 = function () {
		var _v11 = $author$project$SelectionMode$makeSelectionConfig(flags.bm)(flags.bd)(flags.a7)(flags.a6)(flags.bx)(flags.by)(flags.bb)(flags.bf)(maxDropdownItems)(flags.bD)(searchStringMinimumLength)(flags.bG)(valueTransformationAndValidation);
		if (!_v11.$) {
			var value = _v11.a;
			return _Utils_Tuple2(value, $author$project$MuchSelect$NoEffect);
		} else {
			var error = _v11.a;
			return _Utils_Tuple2(
				$author$project$SelectionMode$defaultSelectionConfig,
				$author$project$MuchSelect$ReportErrorMessage(error));
		}
	}();
	var selectionConfig = _v10.a;
	var selectionConfigErrorEffect = _v10.b;
	var _v12 = function () {
		var _v13 = A2($author$project$SelectedValueEncoding$stringToValueStrings, selectedValueEncoding, flags.bE);
		if (!_v13.$) {
			var values = _v13.a;
			return _Utils_Tuple2(values, $author$project$MuchSelect$NoEffect);
		} else {
			var error = _v13.a;
			return _Utils_Tuple2(
				_List_Nil,
				$author$project$MuchSelect$ReportErrorMessage(error));
		}
	}();
	var initialValues = _v12.a;
	var initialValueErrEffect = _v12.b;
	var _v14 = function () {
		var _v15 = A2(
			$elm$json$Json$Decode$decodeString,
			A2(
				$author$project$OptionList$decoderWithAge,
				1,
				$author$project$SelectionMode$getOutputStyle(selectionConfig)),
			flags.bw);
		if (!_v15.$) {
			var options = _v15.a;
			var _v16 = $author$project$SelectionMode$getSelectionMode(selectionConfig);
			if (!_v16) {
				var _v17 = $elm$core$List$head(initialValues);
				if (!_v17.$) {
					var initialValueStr_ = _v17.a;
					if (A2($author$project$OptionList$hasOptionByValueString, initialValueStr_, options)) {
						var optionsWithUniqueValues = A2($author$project$OptionList$uniqueBy, $author$project$Option$getOptionValueAsString, options);
						return _Utils_Tuple2(
							A2($author$project$OptionList$selectOptionsInOptionsListByString, initialValues, optionsWithUniqueValues),
							$author$project$MuchSelect$NoEffect);
					} else {
						return _Utils_Tuple2(
							A2($author$project$OptionList$addAdditionalSelectedOptionWithStringValue, initialValueStr_, options),
							$author$project$MuchSelect$NoEffect);
					}
				} else {
					var optionsWithUniqueValues = A2($author$project$OptionList$uniqueBy, $author$project$Option$getOptionValueAsString, options);
					return _Utils_Tuple2(optionsWithUniqueValues, $author$project$MuchSelect$NoEffect);
				}
			} else {
				var optionsWithInitialValues = A2(
					$author$project$OptionList$addAndSelectOptionsInOptionsListByString,
					initialValues,
					A2(
						$author$project$OptionList$filter,
						A2($elm$core$Basics$composeL, $elm$core$Basics$not, $author$project$Option$isEmpty),
						options));
				return _Utils_Tuple2(optionsWithInitialValues, $author$project$MuchSelect$NoEffect);
			}
		} else {
			var error = _v15.a;
			return _Utils_Tuple2(
				$author$project$OptionList$FancyOptionList(_List_Nil),
				$author$project$MuchSelect$ReportErrorMessage(
					$elm$json$Json$Decode$errorToString(error)));
		}
	}();
	var optionsWithInitialValueSelected = _v14.a;
	var errorEffect = _v14.b;
	var optionsWithInitialValueSelectedSorted = function () {
		var _v21 = $author$project$SelectionMode$getOutputStyle(selectionConfig);
		if (!_v21) {
			return A2($author$project$OptionList$sort, optionSort, optionsWithInitialValueSelected);
		} else {
			return $author$project$OptionList$organizeNewDatalistOptions(optionsWithInitialValueSelected);
		}
	}();
	return _Utils_Tuple2(
		{
			m: $author$project$SelectionMode$initDomStateCache(selectionConfig),
			bg: 0,
			b8: initialValues,
			M: A2(
				$elm$core$Result$withDefault,
				0,
				$author$project$OptionSorting$stringToOptionSort(flags.M)),
			b: optionsWithInitialValueSelectedSorted,
			d: function () {
				if (flags.bo) {
					return $author$project$RightSlot$ShowLoadingIndicator;
				} else {
					var _v18 = $author$project$SelectionMode$getOutputStyle(selectionConfig);
					if (!_v18) {
						var _v19 = $author$project$SelectionMode$getSelectionMode(selectionConfig);
						if (!_v19) {
							return $author$project$RightSlot$ShowDropdownIndicator(1);
						} else {
							return $author$project$OptionList$hasSelectedOption(optionsWithInitialValueSelected) ? $author$project$RightSlot$ShowClearButton : $author$project$RightSlot$ShowDropdownIndicator(1);
						}
					} else {
						var _v20 = $author$project$SelectionMode$getSelectionMode(selectionConfig);
						if (!_v20) {
							return $author$project$RightSlot$ShowNothing;
						} else {
							return $author$project$RightSlot$updateRightSlotForDatalist(optionsWithInitialValueSelectedSorted);
						}
					}
				}
			}(),
			g: $author$project$SearchString$reset,
			v: $grotsev$elm_debouncer$Bounce$init,
			q: $author$project$MuchSelect$getDebouceDelayForSearch(
				$author$project$OptionList$length(optionsWithInitialValueSelectedSorted)),
			aq: 0,
			h: selectedValueEncoding,
			a: selectionConfig,
			aL: A2($author$project$MuchSelect$ValueCasing, 100, 45)
		},
		$author$project$MuchSelect$batch(
			_List_fromArray(
				[
					errorEffect,
					maxDropdownItemsErrorEffect,
					searchStringMinimumLengthErrorEffect,
					initialValueErrEffect,
					$author$project$MuchSelect$ReportReady,
					A4(
					$author$project$MuchSelect$makeEffectsForInitialValue,
					$author$project$SelectionMode$getEventMode(selectionConfig),
					$author$project$SelectionMode$getSelectionMode(selectionConfig),
					selectedValueEncoding,
					$author$project$OptionList$selectedOptions(optionsWithInitialValueSelected)),
					$author$project$MuchSelect$UpdateOptionsInWebWorker,
					valueTransformationAndValidationErrorEffect,
					selectionConfigErrorEffect,
					optionSortErrorEffect
				])));
};
var $elm$core$Tuple$mapSecond = F2(
	function (func, _v0) {
		var x = _v0.a;
		var y = _v0.b;
		return _Utils_Tuple2(
			x,
			func(y));
	});
var $author$project$MuchSelect$SearchStringSteady = {$: 10};
var $author$project$Ports$allOptions = _Platform_outgoingPort('allOptions', $elm$core$Basics$identity);
var $elm$core$Platform$Cmd$batch = _Platform_batch;
var $elm$json$Json$Encode$null = _Json_encodeNull;
var $author$project$Ports$blurInput = _Platform_outgoingPort(
	'blurInput',
	function ($) {
		return $elm$json$Json$Encode$null;
	});
var $author$project$Ports$customOptionSelected = _Platform_outgoingPort(
	'customOptionSelected',
	$elm$json$Json$Encode$list($elm$json$Json$Encode$string));
var $elm$core$Process$sleep = _Process_sleep;
var $grotsev$elm_debouncer$Bounce$delay = F2(
	function (milliseconds, msg) {
		return A2(
			$elm$core$Task$perform,
			$elm$core$Basics$always(msg),
			$elm$core$Process$sleep(milliseconds));
	});
var $author$project$Ports$dumpConfigState = _Platform_outgoingPort('dumpConfigState', $elm$core$Basics$identity);
var $author$project$Ports$dumpSelectedValues = _Platform_outgoingPort('dumpSelectedValues', $elm$core$Basics$identity);
var $author$project$LightDomChange$encode = function (lightDomChange) {
	switch (lightDomChange.$) {
		case 0:
			var name = lightDomChange.a;
			var value = lightDomChange.b;
			return $elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'changeType',
						$elm$json$Json$Encode$string('add-update-attribute')),
						_Utils_Tuple2(
						'name',
						$elm$json$Json$Encode$string(name)),
						_Utils_Tuple2(
						'value',
						$elm$json$Json$Encode$string(value))
					]));
		case 1:
			var name = lightDomChange.a;
			return $elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'changeType',
						$elm$json$Json$Encode$string('remove-attribute')),
						_Utils_Tuple2(
						'name',
						$elm$json$Json$Encode$string(name))
					]));
		default:
			var data = lightDomChange.a;
			return $elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'changeType',
						$elm$json$Json$Encode$string('update-selected-value')),
						_Utils_Tuple2('data', data)
					]));
	}
};
var $author$project$Ports$errorMessage = _Platform_outgoingPort('errorMessage', $elm$json$Json$Encode$string);
var $author$project$Ports$focusInput = _Platform_outgoingPort(
	'focusInput',
	function ($) {
		return $elm$json$Json$Encode$null;
	});
var $author$project$Ports$initialValueSet = _Platform_outgoingPort('initialValueSet', $elm$core$Basics$identity);
var $author$project$Ports$inputBlurred = _Platform_outgoingPort(
	'inputBlurred',
	function ($) {
		return $elm$json$Json$Encode$null;
	});
var $author$project$Ports$inputFocused = _Platform_outgoingPort(
	'inputFocused',
	function ($) {
		return $elm$json$Json$Encode$null;
	});
var $author$project$Ports$inputKeyUp = _Platform_outgoingPort('inputKeyUp', $elm$json$Json$Encode$string);
var $author$project$Ports$invalidValue = _Platform_outgoingPort('invalidValue', $elm$core$Basics$identity);
var $author$project$Ports$lightDomChange = _Platform_outgoingPort('lightDomChange', $elm$core$Basics$identity);
var $author$project$Ports$muchSelectIsReady = _Platform_outgoingPort(
	'muchSelectIsReady',
	function ($) {
		return $elm$json$Json$Encode$null;
	});
var $elm$core$Platform$Cmd$none = $elm$core$Platform$Cmd$batch(_List_Nil);
var $author$project$Ports$optionDeselected = _Platform_outgoingPort('optionDeselected', $elm$core$Basics$identity);
var $author$project$Ports$optionSelected = _Platform_outgoingPort('optionSelected', $elm$core$Basics$identity);
var $author$project$Ports$optionsUpdated = _Platform_outgoingPort('optionsUpdated', $elm$json$Json$Encode$bool);
var $author$project$Ports$scrollDropdownToElement = _Platform_outgoingPort('scrollDropdownToElement', $elm$json$Json$Encode$string);
var $author$project$Ports$searchOptionsWithWebWorker = _Platform_outgoingPort('searchOptionsWithWebWorker', $elm$core$Basics$identity);
var $author$project$Ports$sendCustomValidationRequest = _Platform_outgoingPort(
	'sendCustomValidationRequest',
	function ($) {
		var a = $.a;
		var b = $.b;
		return A2(
			$elm$json$Json$Encode$list,
			$elm$core$Basics$identity,
			_List_fromArray(
				[
					$elm$json$Json$Encode$string(a),
					$elm$json$Json$Encode$int(b)
				]));
	});
var $author$project$Ports$updateOptionsFromDom = _Platform_outgoingPort(
	'updateOptionsFromDom',
	function ($) {
		return $elm$json$Json$Encode$null;
	});
var $author$project$Ports$updateOptionsInWebWorker = _Platform_outgoingPort(
	'updateOptionsInWebWorker',
	function ($) {
		return $elm$json$Json$Encode$null;
	});
var $author$project$Ports$valueChangedMultiSelectSelect = _Platform_outgoingPort('valueChangedMultiSelectSelect', $elm$core$Basics$identity);
var $author$project$Ports$valueChangedSingleSelect = _Platform_outgoingPort('valueChangedSingleSelect', $elm$core$Basics$identity);
var $author$project$Ports$valueCleared = _Platform_outgoingPort(
	'valueCleared',
	function ($) {
		return $elm$json$Json$Encode$null;
	});
var $author$project$MuchSelect$perform = function (effect) {
	switch (effect.$) {
		case 0:
			return $elm$core$Platform$Cmd$none;
		case 1:
			var effects = effect.a;
			return $elm$core$Platform$Cmd$batch(
				A2($elm$core$List$map, $author$project$MuchSelect$perform, effects));
		case 2:
			return $author$project$Ports$focusInput(0);
		case 3:
			return $author$project$Ports$blurInput(0);
		case 5:
			return $author$project$Ports$inputBlurred(0);
		case 7:
			var milSeconds = effect.a;
			return A2($grotsev$elm_debouncer$Bounce$delay, milSeconds, $author$project$MuchSelect$SearchStringSteady);
		case 4:
			return $author$project$Ports$inputFocused(0);
		case 6:
			var string = effect.a;
			return $author$project$Ports$inputKeyUp(string);
		case 8:
			return $author$project$Ports$updateOptionsInWebWorker(0);
		case 9:
			var value = effect.a;
			return $author$project$Ports$searchOptionsWithWebWorker(value);
		case 10:
			var value = effect.a;
			var selectionMode = effect.b;
			if (!selectionMode) {
				return $author$project$Ports$valueChangedSingleSelect(value);
			} else {
				return $author$project$Ports$valueChangedMultiSelectSelect(value);
			}
		case 11:
			return $author$project$Ports$valueCleared(0);
		case 12:
			var value = effect.a;
			return $author$project$Ports$invalidValue(value);
		case 13:
			var strings = effect.a;
			return $author$project$Ports$customOptionSelected(strings);
		case 14:
			var value = effect.a;
			return $author$project$Ports$optionSelected(value);
		case 15:
			var value = effect.a;
			return $author$project$Ports$optionDeselected(value);
		case 16:
			var bool = effect.a;
			return $author$project$Ports$optionsUpdated(bool);
		case 17:
			var _v2 = effect.a;
			var string = _v2.a;
			var _int = _v2.b;
			return $author$project$Ports$sendCustomValidationRequest(
				_Utils_Tuple2(string, _int));
		case 18:
			var string = effect.a;
			return $author$project$Ports$errorMessage(string);
		case 19:
			return $author$project$Ports$muchSelectIsReady(0);
		case 21:
			return $author$project$Ports$updateOptionsFromDom(0);
		case 22:
			var string = effect.a;
			return $author$project$Ports$scrollDropdownToElement(string);
		case 23:
			var value = effect.a;
			return $author$project$Ports$allOptions(value);
		case 20:
			var value = effect.a;
			return $author$project$Ports$initialValueSet(value);
		case 24:
			var value = effect.a;
			return $author$project$Ports$dumpConfigState(value);
		case 25:
			var value = effect.a;
			return $author$project$Ports$dumpSelectedValues(value);
		default:
			var lightDomChange_ = effect.a;
			return $author$project$Ports$lightDomChange(
				$author$project$LightDomChange$encode(lightDomChange_));
	}
};
var $author$project$MuchSelect$AddOptions = function (a) {
	return {$: 16, a: a};
};
var $author$project$MuchSelect$AllowCustomOptionsChanged = function (a) {
	return {$: 25, a: a};
};
var $author$project$MuchSelect$AttributeChanged = function (a) {
	return {$: 47, a: a};
};
var $author$project$MuchSelect$AttributeRemoved = function (a) {
	return {$: 48, a: a};
};
var $author$project$MuchSelect$CustomOptionHintChanged = function (a) {
	return {$: 49, a: a};
};
var $author$project$MuchSelect$CustomValidationResponse = function (a) {
	return {$: 45, a: a};
};
var $author$project$MuchSelect$DeselectOption = function (a) {
	return {$: 19, a: a};
};
var $author$project$MuchSelect$DisabledAttributeChanged = function (a) {
	return {$: 26, a: a};
};
var $author$project$MuchSelect$LoadingAttributeChanged = function (a) {
	return {$: 22, a: a};
};
var $author$project$MuchSelect$MaxDropdownItemsChanged = function (a) {
	return {$: 23, a: a};
};
var $author$project$MuchSelect$MultiSelectAttributeChanged = function (a) {
	return {$: 27, a: a};
};
var $author$project$MuchSelect$MultiSelectSingleItemRemovalAttributeChanged = function (a) {
	return {$: 28, a: a};
};
var $author$project$MuchSelect$OptionSortingChanged = function (a) {
	return {$: 15, a: a};
};
var $author$project$MuchSelect$OptionsReplaced = function (a) {
	return {$: 14, a: a};
};
var $author$project$MuchSelect$OutputStyleChanged = function (a) {
	return {$: 31, a: a};
};
var $author$project$MuchSelect$PlaceholderAttributeChanged = function (a) {
	return {$: 21, a: a};
};
var $author$project$MuchSelect$RemoveOptions = function (a) {
	return {$: 17, a: a};
};
var $author$project$MuchSelect$RequestAllOptions = {$: 43};
var $author$project$MuchSelect$RequestConfigState = {$: 51};
var $author$project$MuchSelect$RequestSelectedValues = {$: 52};
var $author$project$MuchSelect$SearchStringMinimumLengthAttributeChanged = function (a) {
	return {$: 29, a: a};
};
var $author$project$MuchSelect$SelectOption = function (a) {
	return {$: 18, a: a};
};
var $author$project$MuchSelect$SelectedItemStaysInPlaceChanged = function (a) {
	return {$: 30, a: a};
};
var $author$project$MuchSelect$SelectedValueEncodingChanged = function (a) {
	return {$: 50, a: a};
};
var $author$project$MuchSelect$ShowDropdownFooterChanged = function (a) {
	return {$: 24, a: a};
};
var $author$project$MuchSelect$UpdateSearchResultsForOptions = function (a) {
	return {$: 44, a: a};
};
var $author$project$MuchSelect$UpdateTransformationAndValidation = function (a) {
	return {$: 46, a: a};
};
var $author$project$MuchSelect$ValueCasingWidthUpdate = function (a) {
	return {$: 37, a: a};
};
var $author$project$MuchSelect$ValueChanged = function (a) {
	return {$: 13, a: a};
};
var $elm$json$Json$Decode$value = _Json_decodeValue;
var $author$project$Ports$addOptionsReceiver = _Platform_incomingPort('addOptionsReceiver', $elm$json$Json$Decode$value);
var $author$project$Ports$allowCustomOptionsReceiver = _Platform_incomingPort(
	'allowCustomOptionsReceiver',
	A2(
		$elm$json$Json$Decode$andThen,
		function (_v0) {
			return A2(
				$elm$json$Json$Decode$andThen,
				function (_v1) {
					return $elm$json$Json$Decode$succeed(
						_Utils_Tuple2(_v0, _v1));
				},
				A2($elm$json$Json$Decode$index, 1, $elm$json$Json$Decode$string));
		},
		A2($elm$json$Json$Decode$index, 0, $elm$json$Json$Decode$bool)));
var $author$project$Ports$attributeChanged = _Platform_incomingPort(
	'attributeChanged',
	A2(
		$elm$json$Json$Decode$andThen,
		function (_v0) {
			return A2(
				$elm$json$Json$Decode$andThen,
				function (_v1) {
					return $elm$json$Json$Decode$succeed(
						_Utils_Tuple2(_v0, _v1));
				},
				A2($elm$json$Json$Decode$index, 1, $elm$json$Json$Decode$string));
		},
		A2($elm$json$Json$Decode$index, 0, $elm$json$Json$Decode$string)));
var $author$project$Ports$attributeRemoved = _Platform_incomingPort('attributeRemoved', $elm$json$Json$Decode$string);
var $elm$core$Platform$Sub$batch = _Platform_batch;
var $author$project$Ports$customOptionHintReceiver = _Platform_incomingPort('customOptionHintReceiver', $elm$json$Json$Decode$string);
var $author$project$Ports$customValidationReceiver = _Platform_incomingPort('customValidationReceiver', $elm$json$Json$Decode$value);
var $author$project$Ports$deselectOptionReceiver = _Platform_incomingPort('deselectOptionReceiver', $elm$json$Json$Decode$value);
var $author$project$Ports$disableChangedReceiver = _Platform_incomingPort('disableChangedReceiver', $elm$json$Json$Decode$bool);
var $author$project$Ports$loadingChangedReceiver = _Platform_incomingPort('loadingChangedReceiver', $elm$json$Json$Decode$bool);
var $author$project$Ports$maxDropdownItemsChangedReceiver = _Platform_incomingPort('maxDropdownItemsChangedReceiver', $elm$json$Json$Decode$string);
var $author$project$Ports$multiSelectChangedReceiver = _Platform_incomingPort('multiSelectChangedReceiver', $elm$json$Json$Decode$bool);
var $author$project$Ports$multiSelectSingleItemRemovalChangedReceiver = _Platform_incomingPort('multiSelectSingleItemRemovalChangedReceiver', $elm$json$Json$Decode$bool);
var $author$project$Ports$optionSortingChangedReceiver = _Platform_incomingPort('optionSortingChangedReceiver', $elm$json$Json$Decode$string);
var $author$project$Ports$optionsReplacedReceiver = _Platform_incomingPort('optionsReplacedReceiver', $elm$json$Json$Decode$value);
var $author$project$Ports$outputStyleChangedReceiver = _Platform_incomingPort('outputStyleChangedReceiver', $elm$json$Json$Decode$string);
var $author$project$Ports$placeholderChangedReceiver = _Platform_incomingPort(
	'placeholderChangedReceiver',
	A2(
		$elm$json$Json$Decode$andThen,
		function (_v0) {
			return A2(
				$elm$json$Json$Decode$andThen,
				function (_v1) {
					return $elm$json$Json$Decode$succeed(
						_Utils_Tuple2(_v0, _v1));
				},
				A2($elm$json$Json$Decode$index, 1, $elm$json$Json$Decode$string));
		},
		A2($elm$json$Json$Decode$index, 0, $elm$json$Json$Decode$bool)));
var $author$project$Ports$removeOptionsReceiver = _Platform_incomingPort('removeOptionsReceiver', $elm$json$Json$Decode$value);
var $author$project$Ports$requestAllOptionsReceiver = _Platform_incomingPort(
	'requestAllOptionsReceiver',
	$elm$json$Json$Decode$null(0));
var $author$project$Ports$requestConfigState = _Platform_incomingPort(
	'requestConfigState',
	$elm$json$Json$Decode$null(0));
var $author$project$Ports$requestSelectedValues = _Platform_incomingPort(
	'requestSelectedValues',
	$elm$json$Json$Decode$null(0));
var $author$project$Ports$searchStringMinimumLengthChangedReceiver = _Platform_incomingPort('searchStringMinimumLengthChangedReceiver', $elm$json$Json$Decode$int);
var $author$project$Ports$selectOptionReceiver = _Platform_incomingPort('selectOptionReceiver', $elm$json$Json$Decode$value);
var $author$project$Ports$selectedItemStaysInPlaceChangedReceiver = _Platform_incomingPort('selectedItemStaysInPlaceChangedReceiver', $elm$json$Json$Decode$bool);
var $author$project$Ports$selectedValueEncodingChangeReceiver = _Platform_incomingPort('selectedValueEncodingChangeReceiver', $elm$json$Json$Decode$string);
var $author$project$Ports$showDropdownFooterChangedReceiver = _Platform_incomingPort('showDropdownFooterChangedReceiver', $elm$json$Json$Decode$bool);
var $author$project$Ports$transformationAndValidationReceiver = _Platform_incomingPort('transformationAndValidationReceiver', $elm$json$Json$Decode$value);
var $author$project$Ports$updateSearchResultDataWithWebWorkerReceiver = _Platform_incomingPort('updateSearchResultDataWithWebWorkerReceiver', $elm$json$Json$Decode$value);
var $elm$json$Json$Decode$float = _Json_decodeFloat;
var $author$project$Ports$valueCasingDimensionsChangedReceiver = _Platform_incomingPort(
	'valueCasingDimensionsChangedReceiver',
	A2(
		$elm$json$Json$Decode$andThen,
		function (width) {
			return A2(
				$elm$json$Json$Decode$andThen,
				function (height) {
					return $elm$json$Json$Decode$succeed(
						{df: height, ek: width});
				},
				A2($elm$json$Json$Decode$field, 'height', $elm$json$Json$Decode$float));
		},
		A2($elm$json$Json$Decode$field, 'width', $elm$json$Json$Decode$float)));
var $author$project$Ports$valueChangedReceiver = _Platform_incomingPort('valueChangedReceiver', $elm$json$Json$Decode$value);
var $author$project$MuchSelect$subscriptions = function (_v0) {
	return $elm$core$Platform$Sub$batch(
		_List_fromArray(
			[
				$author$project$Ports$addOptionsReceiver($author$project$MuchSelect$AddOptions),
				$author$project$Ports$allowCustomOptionsReceiver($author$project$MuchSelect$AllowCustomOptionsChanged),
				$author$project$Ports$deselectOptionReceiver($author$project$MuchSelect$DeselectOption),
				$author$project$Ports$disableChangedReceiver($author$project$MuchSelect$DisabledAttributeChanged),
				$author$project$Ports$loadingChangedReceiver($author$project$MuchSelect$LoadingAttributeChanged),
				$author$project$Ports$maxDropdownItemsChangedReceiver($author$project$MuchSelect$MaxDropdownItemsChanged),
				$author$project$Ports$multiSelectChangedReceiver($author$project$MuchSelect$MultiSelectAttributeChanged),
				$author$project$Ports$multiSelectSingleItemRemovalChangedReceiver($author$project$MuchSelect$MultiSelectSingleItemRemovalAttributeChanged),
				$author$project$Ports$optionsReplacedReceiver($author$project$MuchSelect$OptionsReplaced),
				$author$project$Ports$optionSortingChangedReceiver($author$project$MuchSelect$OptionSortingChanged),
				$author$project$Ports$placeholderChangedReceiver($author$project$MuchSelect$PlaceholderAttributeChanged),
				$author$project$Ports$removeOptionsReceiver($author$project$MuchSelect$RemoveOptions),
				$author$project$Ports$requestAllOptionsReceiver(
				function (_v1) {
					return $author$project$MuchSelect$RequestAllOptions;
				}),
				$author$project$Ports$searchStringMinimumLengthChangedReceiver($author$project$MuchSelect$SearchStringMinimumLengthAttributeChanged),
				$author$project$Ports$selectOptionReceiver($author$project$MuchSelect$SelectOption),
				$author$project$Ports$selectedItemStaysInPlaceChangedReceiver($author$project$MuchSelect$SelectedItemStaysInPlaceChanged),
				$author$project$Ports$showDropdownFooterChangedReceiver($author$project$MuchSelect$ShowDropdownFooterChanged),
				$author$project$Ports$valueCasingDimensionsChangedReceiver($author$project$MuchSelect$ValueCasingWidthUpdate),
				$author$project$Ports$valueChangedReceiver($author$project$MuchSelect$ValueChanged),
				$author$project$Ports$outputStyleChangedReceiver($author$project$MuchSelect$OutputStyleChanged),
				$author$project$Ports$updateSearchResultDataWithWebWorkerReceiver($author$project$MuchSelect$UpdateSearchResultsForOptions),
				$author$project$Ports$customValidationReceiver($author$project$MuchSelect$CustomValidationResponse),
				$author$project$Ports$transformationAndValidationReceiver($author$project$MuchSelect$UpdateTransformationAndValidation),
				$author$project$Ports$attributeChanged($author$project$MuchSelect$AttributeChanged),
				$author$project$Ports$attributeRemoved($author$project$MuchSelect$AttributeRemoved),
				$author$project$Ports$customOptionHintReceiver($author$project$MuchSelect$CustomOptionHintChanged),
				$author$project$Ports$requestConfigState(
				function (_v2) {
					return $author$project$MuchSelect$RequestConfigState;
				}),
				$author$project$Ports$requestSelectedValues(
				function (_v3) {
					return $author$project$MuchSelect$RequestSelectedValues;
				}),
				$author$project$Ports$selectedValueEncodingChangeReceiver($author$project$MuchSelect$SelectedValueEncodingChanged)
			]));
};
var $author$project$LightDomChange$AddUpdateAttribute = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $author$project$MuchSelect$BlurInput = {$: 3};
var $author$project$MuchSelect$DumpConfigState = function (a) {
	return {$: 24, a: a};
};
var $author$project$MuchSelect$DumpSelectedValues = function (a) {
	return {$: 25, a: a};
};
var $author$project$MuchSelect$FetchOptionsFromDom = {$: 21};
var $author$project$MuchSelect$FocusInput = {$: 2};
var $author$project$RightSlot$InFocusTransition = 0;
var $author$project$MuchSelect$InputHasBeenBlurred = {$: 5};
var $author$project$MuchSelect$InputHasBeenFocused = {$: 4};
var $author$project$MuchSelect$InputHasBeenKeyUp = F2(
	function (a, b) {
		return {$: 6, a: a, b: b};
	});
var $author$project$TransformAndValidate$InputHasBeenValidated = 0;
var $author$project$TransformAndValidate$InputHasFailedValidation = 2;
var $author$project$TransformAndValidate$InputHasValidationPending = 1;
var $author$project$TransformAndValidate$InputValidationIsNotHappening = 3;
var $author$project$OptionDisplay$NewOption = 0;
var $author$project$MuchSelect$OptionsUpdated = function (a) {
	return {$: 16, a: a};
};
var $author$project$MuchSelect$ReportAllOptions = function (a) {
	return {$: 23, a: a};
};
var $author$project$MuchSelect$ReportValueChanged = F2(
	function (a, b) {
		return {$: 10, a: a, b: b};
	});
var $author$project$MuchSelect$ScrollDownToElement = function (a) {
	return {$: 22, a: a};
};
var $author$project$MuchSelect$SearchOptionsWithWebWorker = function (a) {
	return {$: 9, a: a};
};
var $author$project$MuchSelect$SearchStringTouched = function (a) {
	return {$: 7, a: a};
};
var $author$project$OptionDisplay$OptionActivated = {$: 7};
var $author$project$OptionDisplay$activate = function (optionDisplay) {
	switch (optionDisplay.$) {
		case 0:
			return optionDisplay;
		case 1:
			return optionDisplay;
		case 2:
			return optionDisplay;
		case 3:
			return optionDisplay;
		case 4:
			return optionDisplay;
		case 5:
			return optionDisplay;
		case 6:
			return $author$project$OptionDisplay$OptionActivated;
		case 7:
			return optionDisplay;
		default:
			return optionDisplay;
	}
};
var $author$project$DatalistOption$activate = function (option) {
	return A2(
		$author$project$DatalistOption$setOptionDisplay,
		$author$project$OptionDisplay$activate(
			$author$project$DatalistOption$getOptionDisplay(option)),
		option);
};
var $author$project$FancyOption$activate = function (option) {
	return A2(
		$author$project$FancyOption$setOptionDisplay,
		$author$project$OptionDisplay$activate(
			$author$project$FancyOption$getOptionDisplay(option)),
		option);
};
var $author$project$SlottedOption$activate = function (option) {
	return A2(
		$author$project$SlottedOption$setOptionDisplay,
		$author$project$OptionDisplay$activate(
			$author$project$SlottedOption$getOptionDisplay(option)),
		option);
};
var $author$project$Option$activate = function (option) {
	switch (option.$) {
		case 0:
			var fancyOption = option.a;
			return $author$project$Option$FancyOption(
				$author$project$FancyOption$activate(fancyOption));
		case 1:
			var datalistOption = option.a;
			return $author$project$Option$DatalistOption(
				$author$project$DatalistOption$activate(datalistOption));
		default:
			var slottedOption = option.a;
			return $author$project$Option$SlottedOption(
				$author$project$SlottedOption$activate(slottedOption));
	}
};
var $author$project$Option$activateIfEqualRemoveHighlightElse = F2(
	function (optionValue, option) {
		return A2($author$project$Option$optionEqualsOptionValue, optionValue, option) ? $author$project$Option$activate(option) : option;
	});
var $author$project$OptionList$activateOptionInListByOptionValue = F2(
	function (value, options) {
		return A2(
			$author$project$OptionList$map,
			$author$project$Option$activateIfEqualRemoveHighlightElse(value),
			options);
	});
var $author$project$OptionList$findByValue = F2(
	function (optionValue, optionList) {
		return A2(
			$author$project$OptionList$find,
			$author$project$Option$optionEqualsOptionValue(optionValue),
			optionList);
	});
var $author$project$OptionList$hasOptionByValue = F2(
	function (option, optionsList) {
		return A2(
			$author$project$OptionList$hasOptionValue,
			$author$project$Option$getOptionValue(option),
			optionsList);
	});
var $author$project$DatalistOption$merge = F2(
	function (optionA, _v0) {
		return optionA;
	});
var $author$project$FancyOption$getOptionDescription = function (option) {
	switch (option.$) {
		case 0:
			var description = option.d;
			return description;
		case 1:
			return $author$project$OptionDescription$noDescription;
		default:
			return $author$project$OptionDescription$noDescription;
	}
};
var $author$project$OptionDescription$orOptionDescriptions = F2(
	function (optionDescriptionA, optionDescriptionB) {
		if (!optionDescriptionA.$) {
			return optionDescriptionA;
		} else {
			if (!optionDescriptionB.$) {
				return optionDescriptionB;
			} else {
				return optionDescriptionB;
			}
		}
	});
var $author$project$FancyOption$orOptionDescriptions = F2(
	function (optionA, optionB) {
		return A2(
			$author$project$OptionDescription$orOptionDescriptions,
			$author$project$FancyOption$getOptionDescription(optionA),
			$author$project$FancyOption$getOptionDescription(optionB));
	});
var $author$project$FancyOption$getOptionGroup = function (fancyOption) {
	switch (fancyOption.$) {
		case 0:
			var group = fancyOption.e;
			return group;
		case 1:
			return $author$project$OptionGroup$NoOptionGroup;
		default:
			return $author$project$OptionGroup$NoOptionGroup;
	}
};
var $author$project$FancyOption$orOptionGroup = F2(
	function (optionA, optionB) {
		var _v0 = $author$project$FancyOption$getOptionGroup(optionA);
		if (!_v0.$) {
			return $author$project$FancyOption$getOptionGroup(optionA);
		} else {
			var _v1 = $author$project$FancyOption$getOptionGroup(optionB);
			if (!_v1.$) {
				return $author$project$FancyOption$getOptionGroup(optionB);
			} else {
				return $author$project$FancyOption$getOptionGroup(optionA);
			}
		}
	});
var $author$project$FancyOption$getOptionValueAsString = function (option) {
	var _v0 = $author$project$FancyOption$getOptionValue(option);
	if (!_v0.$) {
		var string = _v0.a;
		return string;
	} else {
		return '';
	}
};
var $author$project$FancyOption$isOptionValueEqualToOptionLabel = function (option) {
	var optionValueString = $author$project$FancyOption$getOptionValueAsString(option);
	var optionLabelString = $author$project$OptionLabel$optionLabelToString(
		$author$project$FancyOption$getOptionLabel(option));
	return _Utils_eq(optionValueString, optionLabelString);
};
var $author$project$FancyOption$orOptionLabel = F2(
	function (optionA, optionB) {
		return $author$project$FancyOption$isOptionValueEqualToOptionLabel(optionA) ? ($author$project$FancyOption$isOptionValueEqualToOptionLabel(optionB) ? $author$project$FancyOption$getOptionLabel(optionA) : $author$project$FancyOption$getOptionLabel(optionB)) : $author$project$FancyOption$getOptionLabel(optionA);
	});
var $author$project$FancyOption$orSelectedIndex = F2(
	function (optionA, optionB) {
		return _Utils_eq(
			$author$project$FancyOption$getOptionSelectedIndex(optionA),
			$author$project$FancyOption$getOptionSelectedIndex(optionB)) ? $author$project$FancyOption$getOptionSelectedIndex(optionA) : ((_Utils_cmp(
			$author$project$FancyOption$getOptionSelectedIndex(optionA),
			$author$project$FancyOption$getOptionSelectedIndex(optionB)) > 0) ? $author$project$FancyOption$getOptionSelectedIndex(optionA) : $author$project$FancyOption$getOptionSelectedIndex(optionB));
	});
var $author$project$FancyOption$setDescription = F2(
	function (description, option) {
		switch (option.$) {
			case 0:
				var optionDisplay = option.a;
				var label = option.b;
				var optionValue = option.c;
				var group = option.e;
				var part = option.f;
				var search = option.g;
				return A7($author$project$FancyOption$FancyOption, optionDisplay, label, optionValue, description, group, part, search);
			case 1:
				return option;
			default:
				return option;
		}
	});
var $author$project$FancyOption$setLabel = F2(
	function (label, option) {
		switch (option.$) {
			case 0:
				var optionDisplay = option.a;
				var optionValue = option.c;
				var description = option.d;
				var group = option.e;
				var part = option.f;
				var search = option.g;
				return A7($author$project$FancyOption$FancyOption, optionDisplay, label, optionValue, description, group, part, search);
			case 1:
				var optionDisplay = option.a;
				var optionValue = option.c;
				var maybeOptionSearchFilter = option.d;
				return A4($author$project$FancyOption$CustomFancyOption, optionDisplay, label, optionValue, maybeOptionSearchFilter);
			default:
				var optionDisplay = option.a;
				return A2($author$project$FancyOption$EmptyFancyOption, optionDisplay, label);
		}
	});
var $author$project$FancyOption$setOptionGroup = F2(
	function (optionGroup, option) {
		switch (option.$) {
			case 0:
				var optionDisplay = option.a;
				var label = option.b;
				var optionValue = option.c;
				var description = option.d;
				var part = option.f;
				var search = option.g;
				return A7($author$project$FancyOption$FancyOption, optionDisplay, label, optionValue, description, optionGroup, part, search);
			case 1:
				return option;
			default:
				return option;
		}
	});
var $author$project$OptionDisplay$OptionSelectedAndInvalid = F2(
	function (a, b) {
		return {$: 3, a: a, b: b};
	});
var $author$project$OptionDisplay$OptionSelectedPendingValidation = function (a) {
	return {$: 4, a: a};
};
var $author$project$OptionDisplay$setSelectedIndex = F2(
	function (selectedIndex, optionDisplay) {
		switch (optionDisplay.$) {
			case 0:
				return optionDisplay;
			case 1:
				return optionDisplay;
			case 2:
				var age = optionDisplay.b;
				return A2($author$project$OptionDisplay$OptionSelected, selectedIndex, age);
			case 4:
				return $author$project$OptionDisplay$OptionSelectedPendingValidation(selectedIndex);
			case 3:
				var errors = optionDisplay.b;
				return A2($author$project$OptionDisplay$OptionSelectedAndInvalid, selectedIndex, errors);
			case 5:
				return $author$project$OptionDisplay$OptionSelectedHighlighted(selectedIndex);
			case 6:
				return optionDisplay;
			case 8:
				return optionDisplay;
			default:
				return optionDisplay;
		}
	});
var $author$project$FancyOption$setOptionSelectedIndex = F2(
	function (selectedIndex, option) {
		return A2(
			$author$project$FancyOption$setOptionDisplay,
			A2(
				$author$project$OptionDisplay$setSelectedIndex,
				selectedIndex,
				$author$project$FancyOption$getOptionDisplay(option)),
			option);
	});
var $author$project$FancyOption$merge = F2(
	function (optionA, optionB) {
		var selectedIndex = A2($author$project$FancyOption$orSelectedIndex, optionA, optionB);
		var optionLabel = A2($author$project$FancyOption$orOptionLabel, optionA, optionB);
		var optionGroup = A2($author$project$FancyOption$orOptionGroup, optionA, optionB);
		var optionDescription = A2($author$project$FancyOption$orOptionDescriptions, optionA, optionB);
		return A2(
			$author$project$FancyOption$setOptionSelectedIndex,
			selectedIndex,
			A2(
				$author$project$FancyOption$setOptionGroup,
				optionGroup,
				A2(
					$author$project$FancyOption$setLabel,
					optionLabel,
					A2($author$project$FancyOption$setDescription, optionDescription, optionA))));
	});
var $author$project$Option$merge = F2(
	function (optionA, optionB) {
		switch (optionA.$) {
			case 0:
				var fancyOptionA = optionA.a;
				if (!optionB.$) {
					var fancyOptionB = optionB.a;
					return $author$project$Option$FancyOption(
						A2($author$project$FancyOption$merge, fancyOptionA, fancyOptionB));
				} else {
					return optionA;
				}
			case 1:
				var datalistOptionA = optionA.a;
				if (optionB.$ === 1) {
					var datalistOptionB = optionB.a;
					return $author$project$Option$DatalistOption(
						A2($author$project$DatalistOption$merge, datalistOptionA, datalistOptionB));
				} else {
					return optionA;
				}
			default:
				return optionA;
		}
	});
var $author$project$OptionList$addAdditionalOptionsToOptionList = F2(
	function (currentOptions, newOptions) {
		var reallyNewOptions = A2(
			$author$project$OptionList$filter,
			function (newOption_) {
				return !A2($author$project$OptionList$hasOptionByValue, newOption_, currentOptions);
			},
			newOptions);
		var currentOptionsWithUpdates = A2(
			$author$project$OptionList$map,
			function (currentOption) {
				var _v0 = A2(
					$author$project$OptionList$findByValue,
					$author$project$Option$getOptionValue(currentOption),
					newOptions);
				if (!_v0.$) {
					var newOption_ = _v0.a;
					return A2($author$project$Option$merge, currentOption, newOption_);
				} else {
					return currentOption;
				}
			},
			currentOptions);
		return A2($author$project$OptionList$append, reallyNewOptions, currentOptionsWithUpdates);
	});
var $elm$core$List$drop = F2(
	function (n, list) {
		drop:
		while (true) {
			if (n <= 0) {
				return list;
			} else {
				if (!list.b) {
					return list;
				} else {
					var x = list.a;
					var xs = list.b;
					var $temp$n = n - 1,
						$temp$list = xs;
					n = $temp$n;
					list = $temp$list;
					continue drop;
				}
			}
		}
	});
var $author$project$OptionList$drop = F2(
	function (_int, optionList) {
		switch (optionList.$) {
			case 0:
				var options = optionList.a;
				return $author$project$OptionList$FancyOptionList(
					A2($elm$core$List$drop, _int, options));
			case 1:
				var options = optionList.a;
				return $author$project$OptionList$DatalistOptionList(
					A2($elm$core$List$drop, _int, options));
			default:
				var options = optionList.a;
				return $author$project$OptionList$SlottedOptionList(
					A2($elm$core$List$drop, _int, options));
		}
	});
var $author$project$DatalistOption$newSelectedEmpty = function (selectedIndex) {
	return A2(
		$author$project$DatalistOption$DatalistOption,
		$author$project$OptionDisplay$selected(selectedIndex),
		$author$project$OptionValue$EmptyOptionValue);
};
var $author$project$Option$newSelectedEmptyDatalistOption = function (_int) {
	return $author$project$Option$DatalistOption(
		$author$project$DatalistOption$newSelectedEmpty(_int));
};
var $elm$core$List$takeReverse = F3(
	function (n, list, kept) {
		takeReverse:
		while (true) {
			if (n <= 0) {
				return kept;
			} else {
				if (!list.b) {
					return kept;
				} else {
					var x = list.a;
					var xs = list.b;
					var $temp$n = n - 1,
						$temp$list = xs,
						$temp$kept = A2($elm$core$List$cons, x, kept);
					n = $temp$n;
					list = $temp$list;
					kept = $temp$kept;
					continue takeReverse;
				}
			}
		}
	});
var $elm$core$List$takeTailRec = F2(
	function (n, list) {
		return $elm$core$List$reverse(
			A3($elm$core$List$takeReverse, n, list, _List_Nil));
	});
var $elm$core$List$takeFast = F3(
	function (ctr, n, list) {
		if (n <= 0) {
			return _List_Nil;
		} else {
			var _v0 = _Utils_Tuple2(n, list);
			_v0$1:
			while (true) {
				_v0$5:
				while (true) {
					if (!_v0.b.b) {
						return list;
					} else {
						if (_v0.b.b.b) {
							switch (_v0.a) {
								case 1:
									break _v0$1;
								case 2:
									var _v2 = _v0.b;
									var x = _v2.a;
									var _v3 = _v2.b;
									var y = _v3.a;
									return _List_fromArray(
										[x, y]);
								case 3:
									if (_v0.b.b.b.b) {
										var _v4 = _v0.b;
										var x = _v4.a;
										var _v5 = _v4.b;
										var y = _v5.a;
										var _v6 = _v5.b;
										var z = _v6.a;
										return _List_fromArray(
											[x, y, z]);
									} else {
										break _v0$5;
									}
								default:
									if (_v0.b.b.b.b && _v0.b.b.b.b.b) {
										var _v7 = _v0.b;
										var x = _v7.a;
										var _v8 = _v7.b;
										var y = _v8.a;
										var _v9 = _v8.b;
										var z = _v9.a;
										var _v10 = _v9.b;
										var w = _v10.a;
										var tl = _v10.b;
										return (ctr > 1000) ? A2(
											$elm$core$List$cons,
											x,
											A2(
												$elm$core$List$cons,
												y,
												A2(
													$elm$core$List$cons,
													z,
													A2(
														$elm$core$List$cons,
														w,
														A2($elm$core$List$takeTailRec, n - 4, tl))))) : A2(
											$elm$core$List$cons,
											x,
											A2(
												$elm$core$List$cons,
												y,
												A2(
													$elm$core$List$cons,
													z,
													A2(
														$elm$core$List$cons,
														w,
														A3($elm$core$List$takeFast, ctr + 1, n - 4, tl)))));
									} else {
										break _v0$5;
									}
							}
						} else {
							if (_v0.a === 1) {
								break _v0$1;
							} else {
								break _v0$5;
							}
						}
					}
				}
				return list;
			}
			var _v1 = _v0.b;
			var x = _v1.a;
			return _List_fromArray(
				[x]);
		}
	});
var $elm$core$List$take = F2(
	function (n, list) {
		return A3($elm$core$List$takeFast, 0, n, list);
	});
var $author$project$OptionList$take = F2(
	function (_int, optionList) {
		switch (optionList.$) {
			case 0:
				var options = optionList.a;
				return $author$project$OptionList$FancyOptionList(
					A2($elm$core$List$take, _int, options));
			case 1:
				var options = optionList.a;
				return $author$project$OptionList$DatalistOptionList(
					A2($elm$core$List$take, _int, options));
			default:
				var options = optionList.a;
				return $author$project$OptionList$SlottedOptionList(
					A2($elm$core$List$take, _int, options));
		}
	});
var $author$project$OptionList$addNewSelectedEmptyOptionAtIndex = F2(
	function (index, optionList) {
		var secondPart = A2($author$project$OptionList$drop, index, optionList);
		var firstPart = A2($author$project$OptionList$take, index, optionList);
		return $author$project$OptionList$reIndexSelectedOptions(
			A2(
				$author$project$OptionList$append,
				A2(
					$author$project$OptionList$append,
					firstPart,
					$author$project$OptionList$DatalistOptionList(
						_List_fromArray(
							[
								$author$project$Option$newSelectedEmptyDatalistOption(index)
							]))),
				secondPart));
	});
var $author$project$OptionDisplay$OptionHighlighted = {$: 6};
var $author$project$OptionDisplay$addHighlight = function (optionDisplay) {
	switch (optionDisplay.$) {
		case 0:
			return $author$project$OptionDisplay$OptionHighlighted;
		case 1:
			return optionDisplay;
		case 2:
			var selectedIndex = optionDisplay.a;
			return $author$project$OptionDisplay$OptionSelectedHighlighted(selectedIndex);
		case 4:
			return optionDisplay;
		case 3:
			return optionDisplay;
		case 5:
			return optionDisplay;
		case 6:
			return optionDisplay;
		case 8:
			return optionDisplay;
		default:
			return $author$project$OptionDisplay$OptionHighlighted;
	}
};
var $author$project$FancyOption$highlightOption = function (option) {
	return A2(
		$author$project$FancyOption$setOptionDisplay,
		$author$project$OptionDisplay$addHighlight(
			$author$project$FancyOption$getOptionDisplay(option)),
		option);
};
var $author$project$SlottedOption$highlightOption = function (option) {
	return A2(
		$author$project$SlottedOption$setOptionDisplay,
		$author$project$OptionDisplay$addHighlight(
			$author$project$SlottedOption$getOptionDisplay(option)),
		option);
};
var $author$project$Option$highlight = function (option) {
	switch (option.$) {
		case 0:
			var fancyOption = option.a;
			return $author$project$Option$FancyOption(
				$author$project$FancyOption$highlightOption(fancyOption));
		case 1:
			return option;
		default:
			var slottedOption = option.a;
			return $author$project$Option$SlottedOption(
				$author$project$SlottedOption$highlightOption(slottedOption));
	}
};
var $author$project$OptionDisplay$removeHighlight = function (optionDisplay) {
	switch (optionDisplay.$) {
		case 0:
			return optionDisplay;
		case 1:
			return optionDisplay;
		case 2:
			return optionDisplay;
		case 4:
			return optionDisplay;
		case 3:
			return optionDisplay;
		case 5:
			var selectedIndex = optionDisplay.a;
			return A2($author$project$OptionDisplay$OptionSelected, selectedIndex, 1);
		case 6:
			return $author$project$OptionDisplay$OptionShown(1);
		case 8:
			return optionDisplay;
		default:
			return optionDisplay;
	}
};
var $author$project$FancyOption$removeHighlightFromOption = function (option) {
	return A2(
		$author$project$FancyOption$setOptionDisplay,
		$author$project$OptionDisplay$removeHighlight(
			$author$project$FancyOption$getOptionDisplay(option)),
		option);
};
var $author$project$SlottedOption$removeHighlightFromOption = function (option) {
	return A2(
		$author$project$SlottedOption$setOptionDisplay,
		$author$project$OptionDisplay$removeHighlight(
			$author$project$SlottedOption$getOptionDisplay(option)),
		option);
};
var $author$project$Option$removeHighlight = function (option) {
	switch (option.$) {
		case 0:
			var fancyOption = option.a;
			return $author$project$Option$FancyOption(
				$author$project$FancyOption$removeHighlightFromOption(fancyOption));
		case 1:
			return option;
		default:
			var slottedOption = option.a;
			return $author$project$Option$SlottedOption(
				$author$project$SlottedOption$removeHighlightFromOption(slottedOption));
	}
};
var $author$project$OptionList$changeHighlightedOptionByValue = F2(
	function (optionValue, optionList) {
		return A2(
			$author$project$OptionList$map,
			function (option_) {
				return A2($author$project$Option$optionEqualsOptionValue, optionValue, option_) ? $author$project$Option$highlight(option_) : $author$project$Option$removeHighlight(option_);
			},
			optionList);
	});
var $author$project$OptionList$changeHighlightedOption = F2(
	function (option, optionList) {
		return A2(
			$author$project$OptionList$changeHighlightedOptionByValue,
			$author$project$Option$getOptionValue(option),
			optionList);
	});
var $author$project$Option$isEmptyOrHasEmptyValue = function (option) {
	return $author$project$Option$isEmpty(option) || $author$project$OptionValue$isEmpty(
		$author$project$Option$getOptionValue(option));
};
var $author$project$OptionList$cleanupEmptySelectedOptions = function (options) {
	var selectedOptions_ = $author$project$OptionList$selectedOptions(options);
	var selectedOptionsSansEmptyOptions = A2(
		$author$project$OptionList$filter,
		A2($elm$core$Basics$composeR, $author$project$Option$isEmptyOrHasEmptyValue, $elm$core$Basics$not),
		$author$project$OptionList$selectedOptions(options));
	return (($author$project$OptionList$length(selectedOptions_) > 1) && ($author$project$OptionList$length(selectedOptionsSansEmptyOptions) > 1)) ? selectedOptionsSansEmptyOptions : (($author$project$OptionList$length(selectedOptions_) > 1) ? A2($author$project$OptionList$take, 1, selectedOptions_) : options);
};
var $author$project$MuchSelect$ReportOptionDeselected = function (a) {
	return {$: 15, a: a};
};
var $author$project$OptionList$deselectAll = function (optionList) {
	switch (optionList.$) {
		case 0:
			return A2($author$project$OptionList$map, $author$project$Option$deselect, optionList);
		case 1:
			return $author$project$OptionList$removeEmptyOptions(
				A2(
					$author$project$OptionList$uniqueBy,
					$author$project$Option$getOptionValueAsString,
					A2($author$project$OptionList$map, $author$project$Option$deselect, optionList)));
		default:
			return A2($author$project$OptionList$map, $author$project$Option$deselect, optionList);
	}
};
var $elm$core$List$isEmpty = function (xs) {
	if (!xs.b) {
		return true;
	} else {
		return false;
	}
};
var $author$project$OptionList$isEmpty = function (optionList) {
	switch (optionList.$) {
		case 0:
			var options = optionList.a;
			return $elm$core$List$isEmpty(options);
		case 1:
			var options = optionList.a;
			return $elm$core$List$isEmpty(options);
		default:
			var options = optionList.a;
			return $elm$core$List$isEmpty(options);
	}
};
var $author$project$SelectionMode$isFocused = function (selectionConfig) {
	if (!selectionConfig.$) {
		var interactionState = selectionConfig.c;
		switch (interactionState) {
			case 0:
				return true;
			case 1:
				return false;
			default:
				return false;
		}
	} else {
		var interactionState = selectionConfig.c;
		switch (interactionState) {
			case 0:
				return true;
			case 1:
				return false;
			default:
				return false;
		}
	}
};
var $author$project$MuchSelect$CustomOptionSelected = function (a) {
	return {$: 13, a: a};
};
var $author$project$MuchSelect$InvalidValue = function (a) {
	return {$: 12, a: a};
};
var $author$project$MuchSelect$SendCustomValidationRequest = function (a) {
	return {$: 17, a: a};
};
var $author$project$MuchSelect$ValueCleared = {$: 11};
var $author$project$OptionList$all = F2(
	function (_function, optionList) {
		switch (optionList.$) {
			case 0:
				var options = optionList.a;
				return A2($elm$core$List$all, _function, options);
			case 1:
				var options = optionList.a;
				return A2($elm$core$List$all, _function, options);
			default:
				var options = optionList.a;
				return A2($elm$core$List$all, _function, options);
		}
	});
var $author$project$OptionList$allOptionsAreValid = function (optionList) {
	return A2($author$project$OptionList$all, $author$project$Option$isValid, optionList);
};
var $author$project$FancyOption$isCustomOption = function (option) {
	switch (option.$) {
		case 0:
			return false;
		case 1:
			return true;
		default:
			return false;
	}
};
var $author$project$Option$isCustomOption = function (option) {
	switch (option.$) {
		case 0:
			var fancyOption = option.a;
			return $author$project$FancyOption$isCustomOption(fancyOption);
		case 1:
			return false;
		default:
			return false;
	}
};
var $author$project$OptionList$customOptions = function (optionList) {
	return A2($author$project$OptionList$filter, $author$project$Option$isCustomOption, optionList);
};
var $author$project$OptionList$customSelectedOptions = A2($elm$core$Basics$composeR, $author$project$OptionList$customOptions, $author$project$OptionList$selectedOptions);
var $author$project$OptionList$hasAnyPendingValidation = function (optionList) {
	return A2($author$project$OptionList$any, $author$project$Option$isPendingValidation, optionList);
};
var $author$project$OptionList$optionsValuesAsStrings = function (optionList) {
	return A2($author$project$OptionList$andMap, $author$project$Option$getOptionValueAsString, optionList);
};
var $author$project$MuchSelect$makeEffectsWhenValuesChanges = F4(
	function (eventsMode, selectionMode, selectedValueEncoding, selectedOptionList) {
		var valueChangeCmd = $author$project$OptionList$allOptionsAreValid(selectedOptionList) ? A2(
			$author$project$MuchSelect$ReportValueChanged,
			$author$project$Ports$optionsEncoder(selectedOptionList),
			selectionMode) : ($author$project$OptionList$hasAnyPendingValidation(selectedOptionList) ? $author$project$MuchSelect$NoEffect : $author$project$MuchSelect$InvalidValue(
			$author$project$Ports$optionsEncoder(selectedOptionList)));
		var selectedCustomOptions = $author$project$OptionList$customSelectedOptions(selectedOptionList);
		var lightDomChangeEffect = function () {
			if (!eventsMode) {
				return $author$project$MuchSelect$NoEffect;
			} else {
				return $author$project$MuchSelect$ChangeTheLightDom(
					$author$project$LightDomChange$UpdateSelectedValue(
						$elm$json$Json$Encode$object(
							_List_fromArray(
								[
									_Utils_Tuple2(
									'rawValue',
									A3($author$project$SelectedValueEncoding$rawSelectedValue, selectionMode, selectedValueEncoding, selectedOptionList)),
									_Utils_Tuple2(
									'value',
									A2($author$project$SelectedValueEncoding$selectedValue, selectionMode, selectedOptionList)),
									_Utils_Tuple2(
									'selectionMode',
									function () {
										if (!selectionMode) {
											return $elm$json$Json$Encode$string('single-select');
										} else {
											return $elm$json$Json$Encode$string('multi-select');
										}
									}())
								]))));
			}
		}();
		var customValidationCmd = $author$project$OptionList$hasAnyPendingValidation(selectedOptionList) ? $author$project$MuchSelect$batch(
			A2(
				$author$project$OptionList$andMap,
				function (option) {
					return $author$project$MuchSelect$SendCustomValidationRequest(
						_Utils_Tuple2(
							$author$project$Option$getOptionValueAsString(option),
							$author$project$Option$getOptionSelectedIndex(option)));
				},
				A2($author$project$OptionList$filter, $author$project$Option$isPendingValidation, selectedOptionList))) : $author$project$MuchSelect$NoEffect;
		var customOptionCmd = $author$project$OptionList$isEmpty(selectedCustomOptions) ? $author$project$MuchSelect$NoEffect : ($author$project$OptionList$allOptionsAreValid(selectedCustomOptions) ? $author$project$MuchSelect$CustomOptionSelected(
			$author$project$OptionList$optionsValuesAsStrings(selectedCustomOptions)) : $author$project$MuchSelect$NoEffect);
		var clearCmd = $author$project$OptionList$isEmpty(selectedOptionList) ? $author$project$MuchSelect$ValueCleared : $author$project$MuchSelect$NoEffect;
		return $author$project$MuchSelect$batch(
			_List_fromArray(
				[valueChangeCmd, customOptionCmd, clearCmd, customValidationCmd, lightDomChangeEffect]));
	});
var $author$project$RightSlot$updateRightSlot = F4(
	function (current, outputStyle, selectionMode, selectedOptionList) {
		var hasSelectedOption = !$author$project$OptionList$isEmpty(selectedOptionList);
		if (!outputStyle) {
			if (!selectionMode) {
				switch (current.$) {
					case 0:
						return $author$project$RightSlot$ShowDropdownIndicator(1);
					case 1:
						return $author$project$RightSlot$ShowLoadingIndicator;
					case 2:
						var transitioning = current.a;
						return $author$project$RightSlot$ShowDropdownIndicator(transitioning);
					case 3:
						return $author$project$RightSlot$ShowDropdownIndicator(1);
					case 4:
						return $author$project$RightSlot$ShowDropdownIndicator(1);
					default:
						return $author$project$RightSlot$ShowDropdownIndicator(1);
				}
			} else {
				switch (current.$) {
					case 0:
						return hasSelectedOption ? $author$project$RightSlot$ShowClearButton : $author$project$RightSlot$ShowDropdownIndicator(1);
					case 1:
						return $author$project$RightSlot$ShowLoadingIndicator;
					case 2:
						var focusTransition = current.a;
						return hasSelectedOption ? $author$project$RightSlot$ShowClearButton : $author$project$RightSlot$ShowDropdownIndicator(focusTransition);
					case 3:
						return hasSelectedOption ? $author$project$RightSlot$ShowClearButton : $author$project$RightSlot$ShowDropdownIndicator(1);
					case 4:
						return $author$project$RightSlot$ShowDropdownIndicator(1);
					default:
						return $author$project$RightSlot$ShowDropdownIndicator(1);
				}
			}
		} else {
			if (!selectionMode) {
				switch (current.$) {
					case 0:
						return $author$project$RightSlot$ShowNothing;
					case 1:
						return $author$project$RightSlot$ShowLoadingIndicator;
					case 2:
						return $author$project$RightSlot$ShowNothing;
					case 3:
						return $author$project$RightSlot$ShowNothing;
					case 4:
						return $author$project$RightSlot$ShowNothing;
					default:
						return $author$project$RightSlot$ShowNothing;
				}
			} else {
				var showRemoveButtons = $author$project$OptionList$length(selectedOptionList) > 1;
				var showAddButtons = A2(
					$author$project$OptionList$any,
					function (option) {
						return !$author$project$OptionValue$isEmpty(
							$author$project$Option$getOptionValue(option));
					},
					selectedOptionList);
				var addAndRemoveButtonState = (showAddButtons && (!showRemoveButtons)) ? $author$project$RightSlot$ShowAddButton : ((showAddButtons && showRemoveButtons) ? $author$project$RightSlot$ShowAddAndRemoveButtons : $author$project$RightSlot$ShowNothing);
				switch (current.$) {
					case 0:
						return addAndRemoveButtonState;
					case 1:
						return $author$project$RightSlot$ShowLoadingIndicator;
					case 2:
						return addAndRemoveButtonState;
					case 3:
						return addAndRemoveButtonState;
					case 4:
						return addAndRemoveButtonState;
					default:
						return addAndRemoveButtonState;
				}
			}
		}
	});
var $author$project$MuchSelect$clearAllSelectedOptions = function (model) {
	var optionsAboutToBeDeselected = $author$project$OptionList$selectedOptions(model.b);
	var newOptions = $author$project$OptionList$deselectAll(model.b);
	var focusEffect = $author$project$SelectionMode$isFocused(model.a) ? $author$project$MuchSelect$FocusInput : $author$project$MuchSelect$NoEffect;
	var deselectEventEffect = $author$project$OptionList$isEmpty(optionsAboutToBeDeselected) ? $author$project$MuchSelect$NoEffect : $author$project$MuchSelect$ReportOptionDeselected(
		$author$project$Ports$optionsEncoder(
			$author$project$OptionList$deselectAll(optionsAboutToBeDeselected)));
	return _Utils_Tuple2(
		_Utils_update(
			model,
			{
				b: $author$project$OptionList$deselectAll(newOptions),
				d: A4(
					$author$project$RightSlot$updateRightSlot,
					model.d,
					$author$project$SelectionMode$getOutputStyle(model.a),
					$author$project$SelectionMode$getSelectionMode(model.a),
					$author$project$OptionList$FancyOptionList(_List_Nil)),
				g: $author$project$SearchString$reset
			}),
		$author$project$MuchSelect$batch(
			_List_fromArray(
				[
					A4(
					$author$project$MuchSelect$makeEffectsWhenValuesChanges,
					$author$project$SelectionMode$getEventMode(model.a),
					$author$project$SelectionMode$getSelectionMode(model.a),
					model.h,
					$author$project$OptionList$FancyOptionList(_List_Nil)),
					deselectEventEffect,
					focusEffect
				])));
};
var $author$project$TransformAndValidate$CustomValidationFailed = F3(
	function (a, b, c) {
		return {$: 1, a: a, b: b, c: c};
	});
var $author$project$TransformAndValidate$ValidationFailureMessage = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $author$project$TransformAndValidate$validationFailedMessageDecoder = A3(
	$elm$json$Json$Decode$map2,
	$author$project$TransformAndValidate$ValidationFailureMessage,
	A2($elm$json$Json$Decode$field, 'level', $author$project$TransformAndValidate$validationReportLevelDecoder),
	A2($elm$json$Json$Decode$field, 'errorMessage', $author$project$TransformAndValidate$validationErrorMessageDecoder));
var $author$project$TransformAndValidate$customValidationFailedResultDecoder = A3(
	$elm_community$json_extra$Json$Decode$Extra$when,
	A2($elm$json$Json$Decode$field, 'isValid', $elm$json$Json$Decode$bool),
	$author$project$TransformAndValidate$is(false),
	A4(
		$elm$json$Json$Decode$map3,
		$author$project$TransformAndValidate$CustomValidationFailed,
		A2($elm$json$Json$Decode$field, 'value', $elm$json$Json$Decode$string),
		A2($elm$json$Json$Decode$field, 'selectedValueIndex', $elm$json$Json$Decode$int),
		A2(
			$elm$json$Json$Decode$field,
			'errorMessages',
			$elm$json$Json$Decode$list($author$project$TransformAndValidate$validationFailedMessageDecoder))));
var $author$project$TransformAndValidate$CustomValidationPass = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $author$project$TransformAndValidate$customValidationPassedResultDecoder = A3(
	$elm_community$json_extra$Json$Decode$Extra$when,
	A2($elm$json$Json$Decode$field, 'isValid', $elm$json$Json$Decode$bool),
	$author$project$TransformAndValidate$is(true),
	A3(
		$elm$json$Json$Decode$map2,
		$author$project$TransformAndValidate$CustomValidationPass,
		A2($elm$json$Json$Decode$field, 'value', $elm$json$Json$Decode$string),
		A2($elm$json$Json$Decode$field, 'selectedValueIndex', $elm$json$Json$Decode$int)));
var $author$project$TransformAndValidate$customValidationResultDecoder = $elm$json$Json$Decode$oneOf(
	_List_fromArray(
		[$author$project$TransformAndValidate$customValidationPassedResultDecoder, $author$project$TransformAndValidate$customValidationFailedResultDecoder]));
var $author$project$Option$SearchResults = F3(
	function (optionSearchFilters, searchNonce, isClearingSearch) {
		return {dm: isClearingSearch, dT: optionSearchFilters, d2: searchNonce};
	});
var $author$project$OptionSearchFilter$OptionSearchFilter = F5(
	function (totalScore, bestScore, labelTokens, descriptionTokens, groupTokens) {
		return {cS: bestScore, c1: descriptionTokens, dd: groupTokens, ds: labelTokens, bK: totalScore};
	});
var $elm$core$Tuple$pair = F2(
	function (a, b) {
		return _Utils_Tuple2(a, b);
	});
var $author$project$OptionSearchFilter$decodeToken = A3(
	$elm$json$Json$Decode$map2,
	$elm$core$Tuple$pair,
	A2($elm$json$Json$Decode$field, 'isHighlighted', $elm$json$Json$Decode$bool),
	A2($elm$json$Json$Decode$field, 'stringChunk', $elm$json$Json$Decode$string));
var $author$project$OptionSearchFilter$decodeTokens = $elm$json$Json$Decode$list($author$project$OptionSearchFilter$decodeToken);
var $elm$json$Json$Decode$map5 = _Json_map5;
var $author$project$OptionSearchFilter$decoder = A6(
	$elm$json$Json$Decode$map5,
	$author$project$OptionSearchFilter$OptionSearchFilter,
	A2($elm$json$Json$Decode$field, 'totalScore', $elm$json$Json$Decode$int),
	A2($elm$json$Json$Decode$field, 'bestScore', $elm$json$Json$Decode$int),
	A2($elm$json$Json$Decode$field, 'labelTokens', $author$project$OptionSearchFilter$decodeTokens),
	A2($elm$json$Json$Decode$field, 'descriptionTokens', $author$project$OptionSearchFilter$decodeTokens),
	A2($elm$json$Json$Decode$field, 'groupTokens', $author$project$OptionSearchFilter$decodeTokens));
var $author$project$Option$decodeSearchResults = A4(
	$elm$json$Json$Decode$map3,
	$author$project$Option$SearchResults,
	A2(
		$elm$json$Json$Decode$field,
		'options',
		$elm$json$Json$Decode$list(
			A3(
				$elm$json$Json$Decode$map2,
				F2(
					function (value, searchFilter) {
						return {dx: searchFilter, ei: value};
					}),
				A2($elm$json$Json$Decode$field, 'value', $author$project$OptionValue$decoder),
				A2(
					$elm$json$Json$Decode$field,
					'searchFilter',
					$elm$json$Json$Decode$nullable($author$project$OptionSearchFilter$decoder))))),
	A2($elm$json$Json$Decode$field, 'searchNonce', $elm$json$Json$Decode$int),
	A2($elm$json$Json$Decode$field, 'clearingSearch', $elm$json$Json$Decode$bool));
var $elm$json$Json$Decode$decodeValue = _Json_run;
var $author$project$FancyOption$decoder = $author$project$FancyOption$decoderWithAge(1);
var $author$project$SlottedOption$decoder = $author$project$SlottedOption$decoderWithAge(1);
var $author$project$Option$decoder = $elm$json$Json$Decode$oneOf(
	_List_fromArray(
		[
			A2($elm$json$Json$Decode$map, $author$project$Option$FancyOption, $author$project$FancyOption$decoder),
			A2($elm$json$Json$Decode$map, $author$project$Option$DatalistOption, $author$project$DatalistOption$decoder),
			A2($elm$json$Json$Decode$map, $author$project$Option$SlottedOption, $author$project$SlottedOption$decoder)
		]));
var $author$project$OptionList$deselect = F2(
	function (selectionIndex, optionList) {
		return A2(
			$author$project$OptionList$map,
			function (option) {
				return _Utils_eq(
					$author$project$Option$getOptionSelectedIndex(option),
					$author$project$PositiveInt$toInt(selectionIndex)) ? $author$project$Option$deselect(option) : option;
			},
			optionList);
	});
var $author$project$OptionList$head = function (optionList) {
	switch (optionList.$) {
		case 0:
			var options = optionList.a;
			return $elm$core$List$head(options);
		case 1:
			var options = optionList.a;
			return $elm$core$List$head(options);
		default:
			var options = optionList.a;
			return $elm$core$List$head(options);
	}
};
var $author$project$OptionList$selectSingleOptionByValue = F2(
	function (optionValue, options) {
		return A2(
			$author$project$OptionList$map,
			function (option_) {
				return A2($author$project$Option$optionEqualsOptionValue, optionValue, option_) ? A2($author$project$Option$select, 0, option_) : $author$project$Option$deselect(option_);
			},
			options);
	});
var $author$project$OptionList$deselectAllButTheFirstSelectedOptionInList = function (optionList) {
	var _v0 = $author$project$OptionList$head(
		$author$project$OptionList$selectedOptions(optionList));
	if (!_v0.$) {
		var oneOptionToLeaveSelected = _v0.a;
		return A2(
			$author$project$OptionList$selectSingleOptionByValue,
			$author$project$Option$getOptionValue(oneOptionToLeaveSelected),
			optionList);
	} else {
		return optionList;
	}
};
var $author$project$OptionDisplay$isHighlighted = function (optionDisplay) {
	switch (optionDisplay.$) {
		case 0:
			return false;
		case 1:
			return false;
		case 2:
			return false;
		case 3:
			return false;
		case 4:
			return false;
		case 5:
			return true;
		case 6:
			return true;
		case 8:
			return false;
		default:
			return false;
	}
};
var $author$project$FancyOption$isOptionHighlighted = function (option) {
	return $author$project$OptionDisplay$isHighlighted(
		$author$project$FancyOption$getOptionDisplay(option));
};
var $author$project$SlottedOption$isOptionHighlighted = function (option) {
	return $author$project$OptionDisplay$isHighlighted(
		$author$project$SlottedOption$getOptionDisplay(option));
};
var $author$project$Option$isHighlighted = function (option) {
	switch (option.$) {
		case 0:
			var fancyOption = option.a;
			return $author$project$FancyOption$isOptionHighlighted(fancyOption);
		case 1:
			return false;
		default:
			var slottedOption = option.a;
			return $author$project$SlottedOption$isOptionHighlighted(slottedOption);
	}
};
var $author$project$OptionList$deselectAllSelectedHighlightedOptions = function (optionList) {
	return A2(
		$author$project$OptionList$map,
		function (option) {
			return ($author$project$Option$isSelected(option) && $author$project$Option$isHighlighted(option)) ? $author$project$Option$deselect(option) : option;
		},
		optionList);
};
var $elm_community$list_extra$List$Extra$last = function (items) {
	last:
	while (true) {
		if (!items.b) {
			return $elm$core$Maybe$Nothing;
		} else {
			if (!items.b.b) {
				var x = items.a;
				return $elm$core$Maybe$Just(x);
			} else {
				var rest = items.b;
				var $temp$items = rest;
				items = $temp$items;
				continue last;
			}
		}
	}
};
var $author$project$OptionList$last = function (optionList) {
	switch (optionList.$) {
		case 0:
			var options = optionList.a;
			return $elm_community$list_extra$List$Extra$last(options);
		case 1:
			var options = optionList.a;
			return $elm_community$list_extra$List$Extra$last(options);
		default:
			var options = optionList.a;
			return $elm_community$list_extra$List$Extra$last(options);
	}
};
var $author$project$OptionList$deselectLastSelectedOption = function (optionList) {
	var maybeLastSelectionOption = $author$project$OptionList$last(
		$author$project$OptionList$selectedOptions(optionList));
	var maybeLastSelectionIndex = function () {
		if (!maybeLastSelectionOption.$) {
			var lastSelectionOption = maybeLastSelectionOption.a;
			return $author$project$PositiveInt$maybeNew(
				$author$project$Option$getOptionSelectedIndex(lastSelectionOption));
		} else {
			return $elm$core$Maybe$Nothing;
		}
	}();
	if (!maybeLastSelectionIndex.$) {
		var lastSelectionIndex = maybeLastSelectionIndex.a;
		return A2($author$project$OptionList$deselect, lastSelectionIndex, optionList);
	} else {
		return optionList;
	}
};
var $author$project$OptionList$deselectOptionByValue = F2(
	function (optionValue, optionList) {
		return A2(
			$author$project$OptionList$map,
			function (option_) {
				return A2($author$project$Option$optionEqualsOptionValue, optionValue, option_) ? $author$project$Option$deselect(option_) : option_;
			},
			optionList);
	});
var $author$project$SearchString$isEmpty = function (_v0) {
	var str = _v0.a;
	return !$elm$core$String$length(str);
};
var $author$project$MuchSelect$makeEffectsForUpdatingOptionsInTheWebWorker = F2(
	function (searchStringDebounceLength, searchString) {
		var searchStringUpdateCmd = $author$project$SearchString$isEmpty(searchString) ? $author$project$MuchSelect$NoEffect : $author$project$MuchSelect$SearchStringTouched(searchStringDebounceLength);
		return $author$project$MuchSelect$batch(
			_List_fromArray(
				[$author$project$MuchSelect$UpdateOptionsInWebWorker, searchStringUpdateCmd]));
	});
var $author$project$MuchSelect$makeEffectsWhenDeselectingAnOption = F5(
	function (deselectedOption, eventsMode, selectionMode, selectedValueEncoding, optionList) {
		var optionDeselectedEffects = $author$project$MuchSelect$ReportOptionDeselected(
			$author$project$Ports$optionEncoder(deselectedOption));
		return $author$project$MuchSelect$batch(
			_List_fromArray(
				[
					A4($author$project$MuchSelect$makeEffectsWhenValuesChanges, eventsMode, selectionMode, selectedValueEncoding, optionList),
					optionDeselectedEffects
				]));
	});
var $author$project$SelectionMode$getCustomOptionHint = function (selectionConfig) {
	if (!selectionConfig.$) {
		var singleSelectOutputStyle = selectionConfig.a;
		if (!singleSelectOutputStyle.$) {
			var singleSelectCustomHtmlFields = singleSelectOutputStyle.a;
			var _v2 = singleSelectCustomHtmlFields.T;
			if (!_v2.$) {
				var customOptionHint = _v2.a;
				return customOptionHint;
			} else {
				return $elm$core$Maybe$Nothing;
			}
		} else {
			return $elm$core$Maybe$Nothing;
		}
	} else {
		var multiSelectOutputStyle = selectionConfig.a;
		if (!multiSelectOutputStyle.$) {
			var multiSelectCustomHtmlFields = multiSelectOutputStyle.a;
			var _v4 = multiSelectCustomHtmlFields.T;
			if (!_v4.$) {
				var customOptionHint = _v4.a;
				return customOptionHint;
			} else {
				return $elm$core$Maybe$Nothing;
			}
		} else {
			return $elm$core$Maybe$Nothing;
		}
	}
};
var $author$project$SearchString$length = function (_v0) {
	var str = _v0.a;
	return $elm$core$String$length(str);
};
var $author$project$SearchString$new = F2(
	function (string, isCleared_) {
		return A2($author$project$SearchString$SearchString, string, isCleared_);
	});
var $author$project$OptionLabel$optionLabelToSearchString = function (optionLabel) {
	var string = optionLabel.a;
	var maybeCleanString = optionLabel.b;
	if (!maybeCleanString.$) {
		var cleanString = maybeCleanString.a;
		return cleanString;
	} else {
		return $elm$core$String$toLower(string);
	}
};
var $author$project$FancyOption$newCustomOption = F3(
	function (valueString, labelString, maybeCleanLabel) {
		return A4(
			$author$project$FancyOption$CustomFancyOption,
			$author$project$OptionDisplay$default,
			A2($author$project$OptionLabel$newWithCleanLabel, labelString, maybeCleanLabel),
			$author$project$OptionValue$stringToOptionValue(valueString),
			$elm$core$Maybe$Nothing);
	});
var $author$project$SearchString$toString = function (_v0) {
	var str = _v0.a;
	return str;
};
var $author$project$OptionList$prependCustomOption = F3(
	function (maybeCustomOptionHint, searchString, options) {
		var valueString = $author$project$SearchString$toString(searchString);
		var label = function () {
			if (!maybeCustomOptionHint.$) {
				var customOptionHint = maybeCustomOptionHint.a;
				var parts = A2($elm$core$String$split, '{{}}', customOptionHint);
				if (!parts.b) {
					return 'Add ' + ($author$project$SearchString$toString(searchString) + '…');
				} else {
					if (!parts.b.b) {
						return _Utils_ap(
							customOptionHint,
							$author$project$SearchString$toString(searchString));
					} else {
						var first = parts.a;
						var _v2 = parts.b;
						var second = _v2.a;
						return _Utils_ap(
							first,
							_Utils_ap(
								$author$project$SearchString$toString(searchString),
								second));
					}
				}
			} else {
				return 'Add ' + ($author$project$SearchString$toString(searchString) + '…');
			}
		}();
		return A2(
			$author$project$OptionList$append,
			$author$project$OptionList$FancyOptionList(
				_List_fromArray(
					[
						$author$project$Option$FancyOption(
						A3(
							$author$project$FancyOption$newCustomOption,
							valueString,
							label,
							$elm$core$Maybe$Just(valueString)))
					])),
			options);
	});
var $author$project$OptionList$removeOptionsFromOptionList = F2(
	function (optionList, optionsToRemove) {
		return A2(
			$author$project$OptionList$filter,
			function (option) {
				return !A2($author$project$OptionList$hasOptionByValue, option, optionsToRemove);
			},
			optionList);
	});
var $author$project$OptionList$removeUnselectedCustomOptions = function (optionList) {
	var unselectedCustomOptions = A2(
		$author$project$OptionList$filter,
		A2($elm$core$Basics$composeR, $author$project$Option$isSelected, $elm$core$Basics$not),
		A2($author$project$OptionList$filter, $author$project$Option$isCustomOption, optionList));
	return A2($author$project$OptionList$removeOptionsFromOptionList, optionList, unselectedCustomOptions);
};
var $author$project$SearchString$toLower = function (_v0) {
	var str = _v0.a;
	return $elm$core$String$toLower(str);
};
var $author$project$TransformAndValidate$ValidationFailed = F3(
	function (a, b, c) {
		return {$: 1, a: a, b: b, c: c};
	});
var $author$project$TransformAndValidate$ValidationPass = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $author$project$TransformAndValidate$ValidationPending = F2(
	function (a, b) {
		return {$: 2, a: a, b: b};
	});
var $elm$core$List$append = F2(
	function (xs, ys) {
		if (!ys.b) {
			return xs;
		} else {
			return A3($elm$core$List$foldr, $elm$core$List$cons, ys, xs);
		}
	});
var $elm$core$List$concat = function (lists) {
	return A3($elm$core$List$foldr, $elm$core$List$append, _List_Nil, lists);
};
var $elm$core$List$concatMap = F2(
	function (f, list) {
		return $elm$core$List$concat(
			A2($elm$core$List$map, f, list));
	});
var $author$project$TransformAndValidate$getSelectedIndexFromValidationResult = function (validationResult) {
	switch (validationResult.$) {
		case 0:
			var selectedIndex = validationResult.b;
			return selectedIndex;
		case 1:
			var selectedIndex = validationResult.b;
			return selectedIndex;
		default:
			var selectedIndex = validationResult.b;
			return selectedIndex;
	}
};
var $author$project$TransformAndValidate$getSelectedIndexFromValidationResults = function (validationResults) {
	var _v0 = $elm$core$List$head(validationResults);
	if (!_v0.$) {
		var firstResult = _v0.a;
		return $author$project$TransformAndValidate$getSelectedIndexFromValidationResult(firstResult);
	} else {
		return 0;
	}
};
var $author$project$TransformAndValidate$getValidationFailures = function (validationResult) {
	switch (validationResult.$) {
		case 0:
			return _List_Nil;
		case 1:
			var validationFailures = validationResult.c;
			return validationFailures;
		default:
			return _List_Nil;
	}
};
var $author$project$TransformAndValidate$hasValidationFailed = function (validationResult) {
	switch (validationResult.$) {
		case 0:
			return false;
		case 1:
			return true;
		default:
			return false;
	}
};
var $author$project$TransformAndValidate$hasValidationPending = function (validationResult) {
	switch (validationResult.$) {
		case 0:
			return false;
		case 1:
			return false;
		default:
			return true;
	}
};
var $author$project$TransformAndValidate$rollUpErrors = F2(
	function (transformedString, results) {
		return A2($elm$core$List$any, $author$project$TransformAndValidate$hasValidationFailed, results) ? A3(
			$author$project$TransformAndValidate$ValidationFailed,
			transformedString,
			$author$project$TransformAndValidate$getSelectedIndexFromValidationResults(results),
			A2($elm$core$List$concatMap, $author$project$TransformAndValidate$getValidationFailures, results)) : (A2($elm$core$List$any, $author$project$TransformAndValidate$hasValidationPending, results) ? A2(
			$author$project$TransformAndValidate$ValidationPending,
			transformedString,
			$author$project$TransformAndValidate$getSelectedIndexFromValidationResults(results)) : A2(
			$author$project$TransformAndValidate$ValidationPass,
			transformedString,
			$author$project$TransformAndValidate$getSelectedIndexFromValidationResults(results)));
	});
var $author$project$TransformAndValidate$transform = F2(
	function (transformer, string) {
		return $elm$core$String$toLower(string);
	});
var $elm$core$String$replace = F3(
	function (before, after, string) {
		return A2(
			$elm$core$String$join,
			after,
			A2($elm$core$String$split, before, string));
	});
var $author$project$TransformAndValidate$validate = F3(
	function (validator, string, selectedValueIndex) {
		switch (validator.$) {
			case 0:
				var level = validator.a;
				var validationErrorMessage = validator.b;
				var stringWithNoWhiteSpace = A3($elm$core$String$replace, ' ', '', string);
				return _Utils_eq(
					$elm$core$String$length(stringWithNoWhiteSpace),
					$elm$core$String$length(string)) ? A2($author$project$TransformAndValidate$ValidationPass, string, selectedValueIndex) : A3(
					$author$project$TransformAndValidate$ValidationFailed,
					string,
					selectedValueIndex,
					_List_fromArray(
						[
							A2($author$project$TransformAndValidate$ValidationFailureMessage, level, validationErrorMessage)
						]));
			case 1:
				var level = validator.a;
				var validationErrorMessage = validator.b;
				var _int = validator.c;
				return (_Utils_cmp(
					$elm$core$String$length(string),
					_int) > -1) ? A2($author$project$TransformAndValidate$ValidationPass, string, selectedValueIndex) : A3(
					$author$project$TransformAndValidate$ValidationFailed,
					string,
					selectedValueIndex,
					_List_fromArray(
						[
							A2($author$project$TransformAndValidate$ValidationFailureMessage, level, validationErrorMessage)
						]));
			default:
				return A2($author$project$TransformAndValidate$ValidationPending, string, selectedValueIndex);
		}
	});
var $author$project$TransformAndValidate$transformAndValidateSearchString = F2(
	function (_v0, searchString) {
		var transformers = _v0.a;
		var validators = _v0.b;
		var transformedString = A3(
			$elm_community$list_extra$List$Extra$mapAccuml,
			F2(
				function (str, t) {
					return _Utils_Tuple2(
						A2($author$project$TransformAndValidate$transform, t, str),
						t);
				}),
			$author$project$SearchString$toString(searchString),
			transformers).a;
		return A2(
			$author$project$TransformAndValidate$rollUpErrors,
			transformedString,
			A2(
				$elm$core$List$map,
				function (validator) {
					return A3($author$project$TransformAndValidate$validate, validator, transformedString, 0);
				},
				validators));
	});
var $author$project$OptionSearcher$updateOrAddCustomOption = F3(
	function (searchString, selectionMode, options) {
		var noExactOptionLabelMatch = !A2(
			$author$project$OptionList$any,
			function (option_) {
				return _Utils_eq(
					$author$project$OptionLabel$optionLabelToSearchString(
						$author$project$Option$getOptionLabel(option_)),
					$author$project$SearchString$toLower(searchString)) && (!$author$project$Option$isCustomOption(option_));
			},
			options);
		var _v0 = function () {
			if ($author$project$SearchString$length(searchString) > 0) {
				var _v1 = $author$project$SelectionMode$getCustomOptions(selectionMode);
				if (!_v1.$) {
					var transformAndValidate = _v1.b;
					var _v2 = A2($author$project$TransformAndValidate$transformAndValidateSearchString, transformAndValidate, searchString);
					switch (_v2.$) {
						case 0:
							var str = _v2.a;
							return _Utils_Tuple2(
								true,
								A2($author$project$SearchString$new, str, false));
						case 1:
							return _Utils_Tuple2(false, searchString);
						default:
							return _Utils_Tuple2(false, searchString);
					}
				} else {
					return _Utils_Tuple2(false, searchString);
				}
			} else {
				return _Utils_Tuple2(false, searchString);
			}
		}();
		var showCustomOption = _v0.a;
		var newSearchString = _v0.b;
		return (showCustomOption && noExactOptionLabelMatch) ? A3(
			$author$project$OptionList$prependCustomOption,
			$author$project$SelectionMode$getCustomOptionHint(selectionMode),
			newSearchString,
			$author$project$OptionList$removeUnselectedCustomOptions(options)) : $author$project$OptionList$removeUnselectedCustomOptions(options);
	});
var $author$project$MuchSelect$updateModelWithChangesThatEffectTheOptionsWithSearchString = F5(
	function (rightSlot, selectionConfig, searchString, options, model) {
		return _Utils_update(
			model,
			{
				b: A3($author$project$OptionSearcher$updateOrAddCustomOption, searchString, selectionConfig, options),
				d: A4(
					$author$project$RightSlot$updateRightSlot,
					rightSlot,
					$author$project$SelectionMode$getOutputStyle(selectionConfig),
					$author$project$SelectionMode$getSelectionMode(selectionConfig),
					$author$project$OptionList$selectedOptions(options))
			});
	});
var $author$project$MuchSelect$updateModelWithChangesThatEffectTheOptionsWhenTheSearchStringChanges = function (model) {
	return A5($author$project$MuchSelect$updateModelWithChangesThatEffectTheOptionsWithSearchString, model.d, model.a, model.g, model.b, model);
};
var $author$project$MuchSelect$deselectOption = F2(
	function (model, optionValue) {
		var updatedOptions = A2($author$project$OptionList$deselectOptionByValue, optionValue, model.b);
		var maybeOptionToDeselect = A2($author$project$OptionList$findByValue, optionValue, updatedOptions);
		if (!maybeOptionToDeselect.$) {
			var optionToDeselect = maybeOptionToDeselect.a;
			return _Utils_Tuple2(
				$author$project$MuchSelect$updateModelWithChangesThatEffectTheOptionsWhenTheSearchStringChanges(
					_Utils_update(
						model,
						{b: updatedOptions})),
				$author$project$MuchSelect$batch(
					_List_fromArray(
						[
							A5(
							$author$project$MuchSelect$makeEffectsWhenDeselectingAnOption,
							optionToDeselect,
							$author$project$SelectionMode$getEventMode(model.a),
							$author$project$SelectionMode$getSelectionMode(model.a),
							model.h,
							$author$project$OptionList$selectedOptions(updatedOptions)),
							A2($author$project$MuchSelect$makeEffectsForUpdatingOptionsInTheWebWorker, model.q, model.g)
						])));
		} else {
			return _Utils_Tuple2(model, $author$project$MuchSelect$NoEffect);
		}
	});
var $author$project$DatalistOption$getOptionValueAsString = function (datalistOption) {
	return $author$project$OptionValue$optionValueToString(
		$author$project$DatalistOption$getOptionValue(datalistOption));
};
var $author$project$DatalistOption$encode = function (option) {
	return $elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'value',
				$elm$json$Json$Encode$string(
					$author$project$DatalistOption$getOptionValueAsString(option))),
				_Utils_Tuple2(
				'label',
				$elm$json$Json$Encode$string(
					$author$project$OptionLabel$optionLabelToString(
						$author$project$DatalistOption$getOptionLabel(option)))),
				_Utils_Tuple2(
				'labelClean',
				$elm$json$Json$Encode$string(
					$author$project$OptionLabel$optionLabelToSearchString(
						$author$project$DatalistOption$getOptionLabel(option)))),
				_Utils_Tuple2(
				'isSelected',
				$elm$json$Json$Encode$bool(
					$author$project$DatalistOption$isSelected(option)))
			]));
};
var $author$project$OptionDescription$toSearchString = function (optionDescription) {
	if (!optionDescription.$) {
		var description = optionDescription.a;
		var maybeCleanDescription = optionDescription.b;
		if (!maybeCleanDescription.$) {
			var cleanDescription = maybeCleanDescription.a;
			return cleanDescription;
		} else {
			return $elm$core$String$toLower(description);
		}
	} else {
		return '';
	}
};
var $author$project$OptionDescription$toString = function (optionDescription) {
	if (!optionDescription.$) {
		var string = optionDescription.a;
		return string;
	} else {
		return '';
	}
};
var $author$project$OptionGroup$toString = function (optionGroup) {
	if (!optionGroup.$) {
		var string = optionGroup.a;
		return string;
	} else {
		return '';
	}
};
var $author$project$FancyOption$encode = function (option) {
	return $elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'value',
				$elm$json$Json$Encode$string(
					$author$project$FancyOption$getOptionValueAsString(option))),
				_Utils_Tuple2(
				'label',
				$elm$json$Json$Encode$string(
					$author$project$OptionLabel$optionLabelToString(
						$author$project$FancyOption$getOptionLabel(option)))),
				_Utils_Tuple2(
				'labelClean',
				$elm$json$Json$Encode$string(
					$author$project$OptionLabel$optionLabelToSearchString(
						$author$project$FancyOption$getOptionLabel(option)))),
				_Utils_Tuple2(
				'group',
				$elm$json$Json$Encode$string(
					$author$project$OptionGroup$toString(
						$author$project$FancyOption$getOptionGroup(option)))),
				_Utils_Tuple2(
				'description',
				$elm$json$Json$Encode$string(
					$author$project$OptionDescription$toString(
						$author$project$FancyOption$getOptionDescription(option)))),
				_Utils_Tuple2(
				'descriptionClean',
				$elm$json$Json$Encode$string(
					$author$project$OptionDescription$toSearchString(
						$author$project$FancyOption$getOptionDescription(option)))),
				_Utils_Tuple2(
				'isSelected',
				$elm$json$Json$Encode$bool(
					$author$project$FancyOption$isSelected(option)))
			]));
};
var $author$project$OptionSlot$encode = function (optionSlot) {
	var string = optionSlot;
	return $elm$json$Json$Encode$string(string);
};
var $author$project$SlottedOption$getOptionSlot = function (slottedOption) {
	var optionSlot = slottedOption.c;
	return optionSlot;
};
var $author$project$SlottedOption$getOptionValueAsString = function (slottedOption) {
	return $author$project$OptionValue$optionValueToString(
		$author$project$SlottedOption$getOptionValue(slottedOption));
};
var $author$project$SlottedOption$encode = function (option) {
	return $elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'value',
				$elm$json$Json$Encode$string(
					$author$project$SlottedOption$getOptionValueAsString(option))),
				_Utils_Tuple2(
				'slot',
				$author$project$OptionSlot$encode(
					$author$project$SlottedOption$getOptionSlot(option)))
			]));
};
var $author$project$Option$encode = function (option) {
	switch (option.$) {
		case 0:
			var fancyOption = option.a;
			return $author$project$FancyOption$encode(fancyOption);
		case 1:
			var datalistOption = option.a;
			return $author$project$DatalistOption$encode(datalistOption);
		default:
			var slottedOption = option.a;
			return $author$project$SlottedOption$encode(slottedOption);
	}
};
var $author$project$OptionList$encode = function (optionList) {
	return A2(
		$elm$json$Json$Encode$list,
		$author$project$Option$encode,
		$author$project$OptionList$getOptions(optionList));
};
var $author$project$SelectionMode$getMaxDropdownItems = function (selectionConfig) {
	if (!selectionConfig.$) {
		var singleSelectOutputStyle = selectionConfig.a;
		if (!singleSelectOutputStyle.$) {
			var singleSelectCustomHtmlFields = singleSelectOutputStyle.a;
			return singleSelectCustomHtmlFields.bp;
		} else {
			return $author$project$OutputStyle$NoLimitToDropdownItems;
		}
	} else {
		var multiSelectOutputStyle = selectionConfig.a;
		if (!multiSelectOutputStyle.$) {
			var multiSelectCustomHtmlFields = multiSelectOutputStyle.a;
			return multiSelectCustomHtmlFields.bp;
		} else {
			return $author$project$OutputStyle$NoLimitToDropdownItems;
		}
	}
};
var $author$project$SelectionMode$getPlaceholder = function (selectionConfig) {
	if (!selectionConfig.$) {
		var placeholder = selectionConfig.b;
		return placeholder;
	} else {
		var placeholder = selectionConfig.b;
		return placeholder;
	}
};
var $author$project$SelectionMode$getSearchStringMinimumLength = function (selectionConfig) {
	if (!selectionConfig.$) {
		var singleSelectOutputStyle = selectionConfig.a;
		if (!singleSelectOutputStyle.$) {
			var singleSelectCustomHtmlFields = singleSelectOutputStyle.a;
			return singleSelectCustomHtmlFields.bB;
		} else {
			return $author$project$OutputStyle$NoMinimumToSearchStringLength;
		}
	} else {
		var multiSelectOutputStyle = selectionConfig.a;
		if (!multiSelectOutputStyle.$) {
			var multiSelectCustomHtmlFields = multiSelectOutputStyle.a;
			return multiSelectCustomHtmlFields.bB;
		} else {
			return $author$project$OutputStyle$NoMinimumToSearchStringLength;
		}
	}
};
var $author$project$OutputStyle$SelectedItemIsHidden = 2;
var $author$project$SelectionMode$getSelectedItemPlacementMode = function (selectionConfig) {
	if (!selectionConfig.$) {
		var singleSelectOutputStyle = selectionConfig.a;
		if (!singleSelectOutputStyle.$) {
			var singleSelectCustomHtmlFields = singleSelectOutputStyle.a;
			return singleSelectCustomHtmlFields.bC;
		} else {
			return 2;
		}
	} else {
		return 0;
	}
};
var $author$project$SelectionMode$getSingleItemRemoval = function (selectionConfig) {
	if (!selectionConfig.$) {
		return 1;
	} else {
		var multiSelectOutputStyle = selectionConfig.a;
		if (!multiSelectOutputStyle.$) {
			var multiSelectCustomHtmlFields = multiSelectOutputStyle.a;
			return multiSelectCustomHtmlFields.bH;
		} else {
			return 0;
		}
	}
};
var $author$project$SelectionMode$isEventsOnly = function (selectionConfig) {
	if (!selectionConfig.$) {
		var singleSelectOutputStyle = selectionConfig.a;
		if (!singleSelectOutputStyle.$) {
			var singleSelectCustomHtmlFields = singleSelectOutputStyle.a;
			var _v2 = singleSelectCustomHtmlFields.J;
			if (!_v2) {
				return true;
			} else {
				return false;
			}
		} else {
			var eventsMode = singleSelectOutputStyle.a;
			if (!eventsMode) {
				return true;
			} else {
				return false;
			}
		}
	} else {
		var multiSelectOutputStyle = selectionConfig.a;
		if (!multiSelectOutputStyle.$) {
			var multiSelectCustomHtmlFields = multiSelectOutputStyle.a;
			var _v5 = multiSelectCustomHtmlFields.J;
			if (!_v5) {
				return true;
			} else {
				return false;
			}
		} else {
			var eventsMode = multiSelectOutputStyle.a;
			if (!eventsMode) {
				return true;
			} else {
				return false;
			}
		}
	}
};
var $author$project$RightSlot$isLoading = function (rightSlot) {
	switch (rightSlot.$) {
		case 0:
			return false;
		case 1:
			return true;
		case 2:
			return false;
		case 3:
			return false;
		case 4:
			return false;
		default:
			return false;
	}
};
var $author$project$SelectionMode$outputStyleToString = function (outputStyle) {
	if (!outputStyle) {
		return 'custom-html';
	} else {
		return 'datalist';
	}
};
var $elm$core$Tuple$second = function (_v0) {
	var y = _v0.b;
	return y;
};
var $author$project$SelectionMode$getDropdownStyle = function (selectionConfig) {
	if (!selectionConfig.$) {
		var singleSelectOutputStyle = selectionConfig.a;
		if (!singleSelectOutputStyle.$) {
			var singleSelectCustomHtmlFields = singleSelectOutputStyle.a;
			return singleSelectCustomHtmlFields.V;
		} else {
			return 0;
		}
	} else {
		var multiSelectOutputStyle = selectionConfig.a;
		if (!multiSelectOutputStyle.$) {
			var multiSelectCustomHtmlFields = multiSelectOutputStyle.a;
			return multiSelectCustomHtmlFields.V;
		} else {
			return 0;
		}
	}
};
var $author$project$SelectionMode$showDropdownFooter = function (selectionConfig) {
	var _v0 = $author$project$SelectionMode$getDropdownStyle(selectionConfig);
	if (!_v0) {
		return false;
	} else {
		return true;
	}
};
var $author$project$OptionSorting$toString = function (optionSort) {
	if (!optionSort) {
		return 'no-sorting';
	} else {
		return 'by-option-label';
	}
};
var $author$project$SelectedValueEncoding$toString = function (selectedValueEncoding) {
	if (!selectedValueEncoding) {
		return 'comma';
	} else {
		return 'json';
	}
};
var $author$project$ConfigDump$encodeConfig = F4(
	function (selectionConfig, optionSort, selectedValueEncoding, rightSlot) {
		return $elm$json$Json$Encode$object(
			_List_fromArray(
				[
					_Utils_Tuple2(
					'allow-custom-options',
					$elm$json$Json$Encode$bool(
						function () {
							var _v0 = $author$project$SelectionMode$getCustomOptions(selectionConfig);
							if (!_v0.$) {
								return true;
							} else {
								return false;
							}
						}())),
					_Utils_Tuple2(
					'custom-options-hint',
					function () {
						var _v1 = $author$project$SelectionMode$getCustomOptions(selectionConfig);
						if (!_v1.$) {
							var maybeHint = _v1.a;
							if (!maybeHint.$) {
								var hint = maybeHint.a;
								return $elm$json$Json$Encode$string(hint);
							} else {
								return $elm$json$Json$Encode$null;
							}
						} else {
							return $elm$json$Json$Encode$null;
						}
					}()),
					_Utils_Tuple2(
					'disabled',
					$elm$json$Json$Encode$bool(
						$author$project$SelectionMode$isDisabled(selectionConfig))),
					_Utils_Tuple2(
					'events-only',
					$elm$json$Json$Encode$bool(
						$author$project$SelectionMode$isEventsOnly(selectionConfig))),
					_Utils_Tuple2(
					'loading',
					$elm$json$Json$Encode$bool(
						$author$project$RightSlot$isLoading(rightSlot))),
					_Utils_Tuple2(
					'max-dropdown-items',
					$elm$json$Json$Encode$int(
						function () {
							var _v3 = $author$project$SelectionMode$getMaxDropdownItems(selectionConfig);
							if (!_v3.$) {
								var i = _v3.a;
								return $author$project$PositiveInt$toInt(i);
							} else {
								return 0;
							}
						}())),
					_Utils_Tuple2(
					'multi-select',
					$elm$json$Json$Encode$bool(
						function () {
							var _v4 = $author$project$SelectionMode$getSelectionMode(selectionConfig);
							if (_v4 === 1) {
								return true;
							} else {
								return false;
							}
						}())),
					_Utils_Tuple2(
					'option-sorting',
					$elm$json$Json$Encode$string(
						$author$project$OptionSorting$toString(optionSort))),
					_Utils_Tuple2(
					'output-style',
					$elm$json$Json$Encode$string(
						$author$project$SelectionMode$outputStyleToString(
							$author$project$SelectionMode$getOutputStyle(selectionConfig)))),
					_Utils_Tuple2(
					'placeholder',
					$elm$json$Json$Encode$string(
						$author$project$SelectionMode$getPlaceholder(selectionConfig).b)),
					_Utils_Tuple2(
					'search-string-minimum-length',
					$elm$json$Json$Encode$int(
						function () {
							var _v5 = $author$project$SelectionMode$getSearchStringMinimumLength(selectionConfig);
							if (_v5.$ === 1) {
								return 0;
							} else {
								var positiveInt = _v5.a;
								return $author$project$PositiveInt$toInt(positiveInt);
							}
						}())),
					_Utils_Tuple2(
					'selected-item-stays-in-place',
					$elm$json$Json$Encode$bool(
						function () {
							var _v6 = $author$project$SelectionMode$getSelectedItemPlacementMode(selectionConfig);
							switch (_v6) {
								case 0:
									return true;
								case 1:
									return false;
								default:
									return false;
							}
						}())),
					_Utils_Tuple2(
					'selected-value-encoding',
					$elm$json$Json$Encode$string(
						$author$project$SelectedValueEncoding$toString(selectedValueEncoding))),
					_Utils_Tuple2(
					'show-dropdown-footer',
					$elm$json$Json$Encode$bool(
						$author$project$SelectionMode$showDropdownFooter(selectionConfig))),
					_Utils_Tuple2(
					'single-item-removal',
					$elm$json$Json$Encode$bool(
						function () {
							var _v7 = $author$project$SelectionMode$getSingleItemRemoval(selectionConfig);
							if (!_v7) {
								return true;
							} else {
								return false;
							}
						}()))
				]));
	});
var $author$project$SearchString$encode = function (searchString) {
	return $elm$json$Json$Encode$string(
		$author$project$SearchString$toString(searchString));
};
var $author$project$PositiveInt$encode = function (_v0) {
	var positiveInt = _v0;
	return $elm$json$Json$Encode$int(positiveInt);
};
var $author$project$OutputStyle$encodeSearchStringMinimumLength = function (searchStringMinimumLength) {
	if (!searchStringMinimumLength.$) {
		var positiveInt = searchStringMinimumLength.a;
		return $author$project$PositiveInt$encode(positiveInt);
	} else {
		return $elm$json$Json$Encode$int(0);
	}
};
var $author$project$OptionSearcher$encodeSearchParams = F4(
	function (searchString, searchStringMinimumLength, searchNonce, isClearingSearch) {
		return $elm$json$Json$Encode$object(
			_List_fromArray(
				[
					_Utils_Tuple2(
					'searchString',
					$author$project$SearchString$encode(searchString)),
					_Utils_Tuple2(
					'searchStringMinimumLength',
					$author$project$OutputStyle$encodeSearchStringMinimumLength(searchStringMinimumLength)),
					_Utils_Tuple2(
					'searchNonce',
					$elm$json$Json$Encode$int(searchNonce)),
					_Utils_Tuple2(
					'isClearingSearch',
					$elm$json$Json$Encode$bool(isClearingSearch))
				]));
	});
var $author$project$DropdownOptions$DropdownOptionsThatAreNotSelected = function (a) {
	return {$: 1, a: a};
};
var $author$project$DropdownOptions$DropdownOptions = function (a) {
	return {$: 0, a: a};
};
var $author$project$DropdownOptions$filterOptionsToShowInDropdownByOptionDisplay = function (selectionConfig) {
	var _v0 = $author$project$SelectionMode$getSelectionMode(selectionConfig);
	if (!_v0) {
		return $author$project$OptionList$filter(
			function (option) {
				var _v1 = $author$project$Option$getOptionDisplay(option);
				switch (_v1.$) {
					case 0:
						var age = _v1.a;
						if (!age) {
							return false;
						} else {
							return true;
						}
					case 1:
						return false;
					case 2:
						var age = _v1.b;
						if (!age) {
							return false;
						} else {
							return true;
						}
					case 4:
						return true;
					case 3:
						return false;
					case 5:
						return true;
					case 6:
						return true;
					case 8:
						var age = _v1.a;
						if (!age) {
							return false;
						} else {
							return true;
						}
					default:
						return true;
				}
			});
	} else {
		return $author$project$OptionList$filter(
			function (option) {
				var _v5 = $author$project$Option$getOptionDisplay(option);
				switch (_v5.$) {
					case 0:
						var age = _v5.a;
						if (!age) {
							return false;
						} else {
							return true;
						}
					case 1:
						return false;
					case 2:
						var age = _v5.b;
						if (!age) {
							return false;
						} else {
							return true;
						}
					case 4:
						return true;
					case 3:
						return false;
					case 5:
						return false;
					case 6:
						return true;
					case 8:
						var age = _v5.a;
						if (!age) {
							return false;
						} else {
							return true;
						}
					default:
						return true;
				}
			});
	}
};
var $author$project$OptionSearchFilter$impossiblyLowScore = 1000000;
var $author$project$FancyOption$getMaybeOptionSearchFilter = function (option) {
	switch (option.$) {
		case 0:
			var maybeSearchFilter = option.g;
			return maybeSearchFilter;
		case 1:
			return $elm$core$Maybe$Nothing;
		default:
			return $elm$core$Maybe$Nothing;
	}
};
var $author$project$Option$getMaybeOptionSearchFilter = function (option) {
	switch (option.$) {
		case 0:
			var fancyOption = option.a;
			return $author$project$FancyOption$getMaybeOptionSearchFilter(fancyOption);
		case 1:
			return $elm$core$Maybe$Nothing;
		default:
			return $elm$core$Maybe$Nothing;
	}
};
var $elm_community$maybe_extra$Maybe$Extra$cons = F2(
	function (item, list) {
		if (!item.$) {
			var v = item.a;
			return A2($elm$core$List$cons, v, list);
		} else {
			return list;
		}
	});
var $elm_community$maybe_extra$Maybe$Extra$values = A2($elm$core$List$foldr, $elm_community$maybe_extra$Maybe$Extra$cons, _List_Nil);
var $author$project$OptionList$optionSearchResultsBestScore = function (optionList) {
	return A2(
		$elm$core$List$map,
		function ($) {
			return $.cS;
		},
		$elm_community$maybe_extra$Maybe$Extra$values(
			A2(
				$elm$core$List$map,
				$author$project$Option$getMaybeOptionSearchFilter,
				$author$project$OptionList$getOptions(optionList))));
};
var $author$project$OptionList$findLowestSearchScore = function (optionList) {
	var lowSore = A3(
		$elm$core$List$foldl,
		F2(
			function (optionBestScore, lowScore) {
				return (_Utils_cmp(optionBestScore, lowScore) < 0) ? optionBestScore : lowScore;
			}),
		$author$project$OptionSearchFilter$impossiblyLowScore,
		$author$project$OptionList$optionSearchResultsBestScore(
			A2(
				$author$project$OptionList$filter,
				function (option) {
					return !$author$project$Option$isCustomOption(option);
				},
				optionList)));
	return _Utils_eq(lowSore, $author$project$OptionSearchFilter$impossiblyLowScore) ? $elm$core$Maybe$Nothing : $elm$core$Maybe$Just(lowSore);
};
var $author$project$Option$isBelowSearchFilterScore = F2(
	function (score, option) {
		var _v0 = $author$project$Option$getMaybeOptionSearchFilter(option);
		if (!_v0.$) {
			var optionSearchFilter = _v0.a;
			return _Utils_cmp(score, optionSearchFilter.cS) > -1;
		} else {
			return false;
		}
	});
var $author$project$OptionSearchFilter$lowScoreCutOff = function (score) {
	return (!score) ? 51 : ((score <= 10) ? 100 : ((score <= 100) ? 1000 : ((score <= 1000) ? 10000 : $author$project$OptionSearchFilter$impossiblyLowScore)));
};
var $author$project$DropdownOptions$filterOptionsToShowInDropdownBySearchScore = function (optionList) {
	var _v0 = $author$project$OptionList$findLowestSearchScore(optionList);
	if (!_v0.$) {
		var lowScore = _v0.a;
		return A2(
			$author$project$OptionList$filter,
			function (option) {
				return A2(
					$author$project$Option$isBelowSearchFilterScore,
					$author$project$OptionSearchFilter$lowScoreCutOff(lowScore),
					option) || $author$project$Option$isCustomOption(option);
			},
			optionList);
	} else {
		return optionList;
	}
};
var $author$project$DropdownOptions$filterOptionsToShowInDropdown = function (selectionConfig) {
	return A2(
		$elm$core$Basics$composeR,
		$author$project$DropdownOptions$filterOptionsToShowInDropdownByOptionDisplay(selectionConfig),
		$author$project$DropdownOptions$filterOptionsToShowInDropdownBySearchScore);
};
var $elm_community$list_extra$List$Extra$findIndexHelp = F3(
	function (index, predicate, list) {
		findIndexHelp:
		while (true) {
			if (!list.b) {
				return $elm$core$Maybe$Nothing;
			} else {
				var x = list.a;
				var xs = list.b;
				if (predicate(x)) {
					return $elm$core$Maybe$Just(index);
				} else {
					var $temp$index = index + 1,
						$temp$predicate = predicate,
						$temp$list = xs;
					index = $temp$index;
					predicate = $temp$predicate;
					list = $temp$list;
					continue findIndexHelp;
				}
			}
		}
	});
var $elm_community$list_extra$List$Extra$findIndex = $elm_community$list_extra$List$Extra$findIndexHelp(0);
var $author$project$OptionList$findIndex = F2(
	function (_function, optionList) {
		switch (optionList.$) {
			case 0:
				var options = optionList.a;
				return A2($elm_community$list_extra$List$Extra$findIndex, _function, options);
			case 1:
				var options = optionList.a;
				return A2($elm_community$list_extra$List$Extra$findIndex, _function, options);
			default:
				var options = optionList.a;
				return A2($elm_community$list_extra$List$Extra$findIndex, _function, options);
		}
	});
var $author$project$OptionList$findHighlightedOptionIndex = function (optionList) {
	return A2(
		$author$project$OptionList$findIndex,
		function (option) {
			return $author$project$Option$isHighlighted(option);
		},
		optionList);
};
var $author$project$OptionList$findSelectedOptionIndex = function (optionList) {
	return A2($author$project$OptionList$findIndex, $author$project$Option$isSelected, optionList);
};
var $author$project$OptionList$findHighlightedOrSelectedOptionIndex = function (optionList) {
	var _v0 = $author$project$OptionList$findHighlightedOptionIndex(optionList);
	if (!_v0.$) {
		var index = _v0.a;
		return $elm$core$Maybe$Just(index);
	} else {
		return $author$project$OptionList$findSelectedOptionIndex(optionList);
	}
};
var $elm$core$Basics$modBy = _Basics_modBy;
var $elm$core$Maybe$map = F2(
	function (f, maybe) {
		if (!maybe.$) {
			var value = maybe.a;
			return $elm$core$Maybe$Just(
				f(value));
		} else {
			return $elm$core$Maybe$Nothing;
		}
	});
var $author$project$OptionList$sortOptionsByBestScore = function (optionList) {
	return A2(
		$author$project$OptionList$sortBy,
		function (option) {
			return $author$project$Option$isCustomOption(option) ? 1 : A2(
				$elm$core$Maybe$withDefault,
				$author$project$OptionSearchFilter$impossiblyLowScore,
				A2(
					$elm$core$Maybe$map,
					function ($) {
						return $.cS;
					},
					$author$project$Option$getMaybeOptionSearchFilter(option)));
		},
		optionList);
};
var $author$project$DropdownOptions$figureOutWhichOptionsToShowInTheDropdown = F2(
	function (selectionConfig, optionList) {
		var optionsThatCouldBeShown = $author$project$OptionList$sortOptionsByBestScore(
			A2($author$project$DropdownOptions$filterOptionsToShowInDropdown, selectionConfig, optionList));
		var lastIndexOfOptions = $author$project$OptionList$length(optionsThatCouldBeShown) - 1;
		var _v0 = $author$project$SelectionMode$getMaxDropdownItems(selectionConfig);
		if (!_v0.$) {
			var maxDropdownItems = _v0.a;
			var maxNumberOfDropdownItems = $author$project$PositiveInt$toInt(maxDropdownItems);
			if (_Utils_cmp(
				$author$project$OptionList$length(optionsThatCouldBeShown),
				maxNumberOfDropdownItems) < 1) {
				return $author$project$DropdownOptions$DropdownOptions(optionsThatCouldBeShown);
			} else {
				var _v1 = $author$project$OptionList$findHighlightedOrSelectedOptionIndex(optionsThatCouldBeShown);
				if (!_v1.$) {
					var index = _v1.a;
					if (!index) {
						return $author$project$DropdownOptions$DropdownOptions(
							A2($author$project$OptionList$take, maxNumberOfDropdownItems, optionsThatCouldBeShown));
					} else {
						if (_Utils_eq(
							index,
							$author$project$OptionList$length(optionsThatCouldBeShown) - 1)) {
							return $author$project$DropdownOptions$DropdownOptions(
								A2(
									$author$project$OptionList$drop,
									$author$project$OptionList$length(optionList) - maxNumberOfDropdownItems,
									optionsThatCouldBeShown));
						} else {
							var isEven = !A2($elm$core$Basics$modBy, 2, maxNumberOfDropdownItems);
							var half = isEven ? ((maxNumberOfDropdownItems / 2) | 0) : (((maxNumberOfDropdownItems / 2) | 0) + 1);
							return (_Utils_cmp(index + half, lastIndexOfOptions) > 0) ? $author$project$DropdownOptions$DropdownOptions(
								A2(
									$author$project$OptionList$drop,
									$author$project$OptionList$length(optionList) - maxNumberOfDropdownItems,
									optionsThatCouldBeShown)) : (((index - half) < 0) ? $author$project$DropdownOptions$DropdownOptions(
								A2($author$project$OptionList$take, maxNumberOfDropdownItems, optionsThatCouldBeShown)) : $author$project$DropdownOptions$DropdownOptions(
								A2(
									$author$project$OptionList$take,
									maxNumberOfDropdownItems,
									A2($author$project$OptionList$drop, (index + 1) - half, optionList))));
						}
					}
				} else {
					return $author$project$DropdownOptions$DropdownOptions(
						A2($author$project$OptionList$take, maxNumberOfDropdownItems, optionList));
				}
			}
		} else {
			return $author$project$DropdownOptions$DropdownOptions(optionsThatCouldBeShown);
		}
	});
var $author$project$DropdownOptions$getOptions = function (dropdownOptions) {
	if (!dropdownOptions.$) {
		var options = dropdownOptions.a;
		return options;
	} else {
		var options = dropdownOptions.a;
		return options;
	}
};
var $author$project$DropdownOptions$figureOutWhichOptionsToShowInTheDropdownThatAreNotSelected = F2(
	function (selectionConfig, optionList) {
		var visibleOptions = $author$project$DropdownOptions$getOptions(
			A2($author$project$DropdownOptions$figureOutWhichOptionsToShowInTheDropdown, selectionConfig, optionList));
		return $author$project$DropdownOptions$DropdownOptionsThatAreNotSelected(
			$author$project$OptionList$unselectedOptions(visibleOptions));
	});
var $author$project$OptionList$findHighlightedOption = function (optionList) {
	return A2(
		$author$project$OptionList$find,
		function (option) {
			return $author$project$Option$isHighlighted(option);
		},
		optionList);
};
var $author$project$SelectedValueEncoding$fromString = function (string) {
	switch (string) {
		case 'json':
			return $elm$core$Result$Ok(1);
		case 'comma':
			return $elm$core$Result$Ok(0);
		default:
			return $elm$core$Result$Err('Invalid selected value encoding: ' + string);
	}
};
var $author$project$OutputStyle$getTransformAndValidateFromCustomOptions = function (customOptions) {
	if (!customOptions.$) {
		var valueTransformAndValidate = customOptions.b;
		return valueTransformAndValidate;
	} else {
		return $author$project$TransformAndValidate$empty;
	}
};
var $author$project$SelectionMode$getTransformAndValidate = function (selectionConfig) {
	if (!selectionConfig.$) {
		var singleSelectOutputStyle = selectionConfig.a;
		if (!singleSelectOutputStyle.$) {
			var singleSelectCustomHtmlFields = singleSelectOutputStyle.a;
			return $author$project$OutputStyle$getTransformAndValidateFromCustomOptions(singleSelectCustomHtmlFields.T);
		} else {
			var valueTransformAndValidate = singleSelectOutputStyle.b;
			return valueTransformAndValidate;
		}
	} else {
		var multiSelectOutputStyle = selectionConfig.a;
		if (!multiSelectOutputStyle.$) {
			var multiSelectCustomHtmlFields = multiSelectOutputStyle.a;
			return $author$project$OutputStyle$getTransformAndValidateFromCustomOptions(multiSelectCustomHtmlFields.T);
		} else {
			var valueTransformAndValidate = multiSelectOutputStyle.b;
			return valueTransformAndValidate;
		}
	}
};
var $author$project$OptionDisplay$isHighlightedSelected = function (optionDisplay) {
	switch (optionDisplay.$) {
		case 0:
			return false;
		case 1:
			return false;
		case 2:
			return false;
		case 3:
			return false;
		case 4:
			return false;
		case 5:
			return true;
		case 6:
			return false;
		case 8:
			return false;
		default:
			return false;
	}
};
var $author$project$FancyOption$isOptionSelectedHighlighted = function (option) {
	return $author$project$OptionDisplay$isHighlightedSelected(
		$author$project$FancyOption$getOptionDisplay(option));
};
var $author$project$SlottedOption$isOptionSelectedHighlighted = function (option) {
	return $author$project$OptionDisplay$isHighlightedSelected(
		$author$project$SlottedOption$getOptionDisplay(option));
};
var $author$project$Option$isSelectedHighlighted = function (option) {
	switch (option.$) {
		case 0:
			var fancyOption = option.a;
			return $author$project$FancyOption$isOptionSelectedHighlighted(fancyOption);
		case 1:
			return false;
		default:
			var slottedOption = option.a;
			return $author$project$SlottedOption$isOptionSelectedHighlighted(slottedOption);
	}
};
var $author$project$OptionList$hasSelectedHighlightedOptions = function (optionList) {
	return A2($author$project$OptionList$any, $author$project$Option$isSelectedHighlighted, optionList);
};
var $author$project$DropdownOptions$head = function (dropdownOptions) {
	return $author$project$OptionList$head(
		$author$project$DropdownOptions$getOptions(dropdownOptions));
};
var $author$project$SearchString$isCleared = function (_v0) {
	var isCleared_ = _v0.b;
	return isCleared_;
};
var $author$project$RightSlot$isRightSlotTransitioning = function (rightSlot) {
	switch (rightSlot.$) {
		case 0:
			return false;
		case 1:
			return false;
		case 2:
			var transitioning = rightSlot.a;
			if (!transitioning) {
				return true;
			} else {
				return false;
			}
		case 3:
			return false;
		case 4:
			return false;
		default:
			return false;
	}
};
var $author$project$MuchSelect$ReportOptionSelected = function (a) {
	return {$: 14, a: a};
};
var $author$project$MuchSelect$makeEffectsWhenSelectingAnOption = F5(
	function (newlySelectedOption, eventsMode, selectionMode, selectedValueEncoding, optionList) {
		var optionSelectedEffects = $author$project$MuchSelect$ReportOptionSelected(
			$author$project$Ports$optionEncoder(newlySelectedOption));
		return $author$project$MuchSelect$batch(
			_List_fromArray(
				[
					A4($author$project$MuchSelect$makeEffectsWhenValuesChanges, eventsMode, selectionMode, selectedValueEncoding, optionList),
					optionSelectedEffects
				]));
	});
var $author$project$OptionDisplay$isHighlightable = F2(
	function (selectionMode, optionDisplay) {
		switch (optionDisplay.$) {
			case 0:
				return true;
			case 1:
				return false;
			case 2:
				if (!selectionMode) {
					return true;
				} else {
					return false;
				}
			case 4:
				return false;
			case 3:
				return false;
			case 5:
				return false;
			case 6:
				return false;
			case 8:
				return false;
			default:
				return true;
		}
	});
var $author$project$FancyOption$optionIsHighlightable = F2(
	function (selectionMode, option) {
		return A2(
			$author$project$OptionDisplay$isHighlightable,
			selectionMode,
			$author$project$FancyOption$getOptionDisplay(option));
	});
var $author$project$SlottedOption$optionIsHighlightable = F2(
	function (selectionMode, option) {
		return A2(
			$author$project$OptionDisplay$isHighlightable,
			selectionMode,
			$author$project$SlottedOption$getOptionDisplay(option));
	});
var $author$project$Option$isHighlightable = F2(
	function (selectionMode, option) {
		switch (option.$) {
			case 0:
				var fancyOption = option.a;
				return A2($author$project$FancyOption$optionIsHighlightable, selectionMode, fancyOption);
			case 1:
				return false;
			default:
				var slottedOption = option.a;
				return A2($author$project$SlottedOption$optionIsHighlightable, selectionMode, slottedOption);
		}
	});
var $elm_community$list_extra$List$Extra$splitAt = F2(
	function (n, xs) {
		return _Utils_Tuple2(
			A2($elm$core$List$take, n, xs),
			A2($elm$core$List$drop, n, xs));
	});
var $author$project$OptionList$findClosestHighlightableOptionGoingDown = F3(
	function (selectionMode, index, list) {
		return A2(
			$elm_community$list_extra$List$Extra$find,
			$author$project$Option$isHighlightable(selectionMode),
			A2(
				$elm_community$list_extra$List$Extra$splitAt,
				index,
				$author$project$OptionList$getOptions(list)).b);
	});
var $author$project$DropdownOptions$moveHighlightedOptionDown = F2(
	function (selectionConfig, allOptions) {
		var visibleOptions = $author$project$DropdownOptions$getOptions(
			A2($author$project$DropdownOptions$figureOutWhichOptionsToShowInTheDropdown, selectionConfig, allOptions));
		var maybeLowerSibling = A2(
			$elm$core$Maybe$andThen,
			function (index) {
				return A3(
					$author$project$OptionList$findClosestHighlightableOptionGoingDown,
					$author$project$SelectionMode$getSelectionMode(selectionConfig),
					index,
					visibleOptions);
			},
			$author$project$OptionList$findHighlightedOrSelectedOptionIndex(visibleOptions));
		if (!maybeLowerSibling.$) {
			var option = maybeLowerSibling.a;
			return A2($author$project$OptionList$changeHighlightedOption, option, allOptions);
		} else {
			var _v1 = A3(
				$author$project$OptionList$findClosestHighlightableOptionGoingDown,
				$author$project$SelectionMode$getSelectionMode(selectionConfig),
				0,
				visibleOptions);
			if (!_v1.$) {
				var firstOption = _v1.a;
				return A2($author$project$OptionList$changeHighlightedOption, firstOption, allOptions);
			} else {
				return allOptions;
			}
		}
	});
var $author$project$DropdownOptions$length = function (dropdownOptions) {
	return $author$project$OptionList$length(
		$author$project$DropdownOptions$getOptions(dropdownOptions));
};
var $author$project$DropdownOptions$moveHighlightedOptionDownIfThereAreOptions = F2(
	function (selectionConfig, options) {
		var visibleOptions = A2($author$project$DropdownOptions$figureOutWhichOptionsToShowInTheDropdown, selectionConfig, options);
		return ($author$project$DropdownOptions$length(visibleOptions) > 1) ? A2($author$project$DropdownOptions$moveHighlightedOptionDown, selectionConfig, options) : options;
	});
var $author$project$OptionList$findClosestHighlightableOptionGoingUp = F3(
	function (selectionMode, index, list) {
		return A2(
			$elm_community$list_extra$List$Extra$find,
			$author$project$Option$isHighlightable(selectionMode),
			$elm$core$List$reverse(
				A2(
					$elm_community$list_extra$List$Extra$splitAt,
					index,
					$author$project$OptionList$getOptions(list)).a));
	});
var $author$project$DropdownOptions$moveHighlightedOptionUp = F2(
	function (selectionConfig, optionList) {
		var visibleOptions = $author$project$DropdownOptions$getOptions(
			A2($author$project$DropdownOptions$figureOutWhichOptionsToShowInTheDropdown, selectionConfig, optionList));
		var maybeHigherSibling = A2(
			$elm$core$Maybe$andThen,
			function (index) {
				return A3(
					$author$project$OptionList$findClosestHighlightableOptionGoingUp,
					$author$project$SelectionMode$getSelectionMode(selectionConfig),
					index,
					visibleOptions);
			},
			$author$project$OptionList$findHighlightedOrSelectedOptionIndex(visibleOptions));
		if (!maybeHigherSibling.$) {
			var option = maybeHigherSibling.a;
			return A2($author$project$OptionList$changeHighlightedOption, option, optionList);
		} else {
			var _v1 = $author$project$OptionList$head(visibleOptions);
			if (!_v1.$) {
				var firstOption = _v1.a;
				return A2($author$project$OptionList$changeHighlightedOption, firstOption, optionList);
			} else {
				return optionList;
			}
		}
	});
var $grotsev$elm_debouncer$Bounce$push = function (_v0) {
	var counter = _v0;
	return counter + 1;
};
var $author$project$OptionList$findOptionByValue = F2(
	function (option, optionList) {
		return A2(
			$author$project$OptionList$findByValue,
			$author$project$Option$getOptionValue(option),
			optionList);
	});
var $author$project$OptionList$setSelectedOptionInNewOptions = F3(
	function (selectionMode, oldOptions, newOptions) {
		var oldSelectedOption = $author$project$OptionList$selectedOptions(oldOptions);
		var newSelectedOptions = A2(
			$author$project$OptionList$filter,
			function (newOption_) {
				return A2($author$project$OptionList$hasOptionByValue, newOption_, oldSelectedOption);
			},
			newOptions);
		if (!selectionMode) {
			return A2(
				$author$project$OptionList$selectOptions,
				$author$project$OptionList$getOptions(
					A2($author$project$OptionList$take, 1, newSelectedOptions)),
				$author$project$OptionList$deselectAll(newOptions));
		} else {
			return A2(
				$author$project$OptionList$selectOptions,
				$author$project$OptionList$getOptions(newSelectedOptions),
				newOptions);
		}
	});
var $author$project$OptionList$mergeTwoListsOfOptionsPreservingSelectedOptions = F4(
	function (selectionMode, selectedItemPlacementMode, optionsA, optionsB) {
		var updatedOptionsB = A2(
			$author$project$OptionList$map,
			function (optionB) {
				var _v2 = A2($author$project$OptionList$findOptionByValue, optionB, optionsA);
				if (!_v2.$) {
					var optionA = _v2.a;
					return A2($author$project$Option$merge, optionA, optionB);
				} else {
					return optionB;
				}
			},
			optionsB);
		var updatedOptionsA = A2(
			$author$project$OptionList$map,
			function (optionA) {
				var _v1 = A2($author$project$OptionList$findOptionByValue, optionA, optionsB);
				if (!_v1.$) {
					var optionB = _v1.a;
					return A2($author$project$Option$merge, optionA, optionB);
				} else {
					return optionA;
				}
			},
			optionsA);
		var superList = function () {
			switch (selectedItemPlacementMode) {
				case 0:
					return A2($author$project$OptionList$append, updatedOptionsB, updatedOptionsA);
				case 1:
					return A2($author$project$OptionList$append, updatedOptionsA, updatedOptionsB);
				default:
					return A2($author$project$OptionList$append, updatedOptionsB, updatedOptionsA);
			}
		}();
		var newOptions = A2($author$project$OptionList$uniqueBy, $author$project$Option$getOptionValueAsString, superList);
		return A3($author$project$OptionList$setSelectedOptionInNewOptions, selectionMode, superList, newOptions);
	});
var $author$project$DatalistOption$new = function (optionValue) {
	return A2($author$project$DatalistOption$DatalistOption, $author$project$OptionDisplay$default, optionValue);
};
var $author$project$Option$toDatalistOption = function (option) {
	switch (option.$) {
		case 0:
			var fancyOption = option.a;
			return $author$project$Option$DatalistOption(
				A2(
					$author$project$DatalistOption$setOptionDisplay,
					$author$project$FancyOption$getOptionDisplay(fancyOption),
					$author$project$DatalistOption$new(
						$author$project$FancyOption$getOptionValue(fancyOption))));
		case 1:
			return option;
		default:
			var slottedOption = option.a;
			return $author$project$Option$DatalistOption(
				A2(
					$author$project$DatalistOption$setOptionDisplay,
					$author$project$SlottedOption$getOptionDisplay(slottedOption),
					$author$project$DatalistOption$new(
						$author$project$SlottedOption$getOptionValue(slottedOption))));
	}
};
var $author$project$OptionList$toDatalistOptionList = function (optionList) {
	switch (optionList.$) {
		case 0:
			var options = optionList.a;
			return $author$project$OptionList$DatalistOptionList(
				A2($elm$core$List$map, $author$project$Option$toDatalistOption, options));
		case 1:
			return optionList;
		default:
			var options = optionList.a;
			return $author$project$OptionList$DatalistOptionList(
				A2($elm$core$List$map, $author$project$Option$toDatalistOption, options));
	}
};
var $author$project$OptionList$mapValues = F2(
	function (_function, optionList) {
		switch (optionList.$) {
			case 0:
				var options = optionList.a;
				return $author$project$OptionList$FancyOptionList(
					$elm_community$maybe_extra$Maybe$Extra$values(
						A2($elm$core$List$map, _function, options)));
			case 1:
				var options = optionList.a;
				return $author$project$OptionList$DatalistOptionList(
					$elm_community$maybe_extra$Maybe$Extra$values(
						A2($elm$core$List$map, _function, options)));
			default:
				var options = optionList.a;
				return $author$project$OptionList$SlottedOptionList(
					$elm_community$maybe_extra$Maybe$Extra$values(
						A2($elm$core$List$map, _function, options)));
		}
	});
var $author$project$FancyOption$setOptionValue = F2(
	function (optionValue, option) {
		switch (option.$) {
			case 0:
				var display = option.a;
				var label = option.b;
				var description = option.d;
				var group = option.e;
				var part = option.f;
				var maybeSearchFilter = option.g;
				return A7($author$project$FancyOption$FancyOption, display, label, optionValue, description, group, part, maybeSearchFilter);
			case 1:
				var display = option.a;
				var label = option.b;
				var maybeSearchFilter = option.d;
				return A4($author$project$FancyOption$CustomFancyOption, display, label, optionValue, maybeSearchFilter);
			default:
				return option;
		}
	});
var $author$project$Option$transformOptionForOutputStyle = F2(
	function (outputStyle, option) {
		if (!outputStyle) {
			switch (option.$) {
				case 0:
					return $elm$core$Maybe$Just(option);
				case 1:
					var dataListOption = option.a;
					return $elm$core$Maybe$Just(
						$author$project$Option$FancyOption(
							A2(
								$author$project$FancyOption$setOptionValue,
								$author$project$DatalistOption$getOptionValue(dataListOption),
								A2(
									$author$project$FancyOption$setOptionDisplay,
									$author$project$DatalistOption$getOptionDisplay(dataListOption),
									A2(
										$author$project$FancyOption$new,
										$author$project$DatalistOption$getOptionValueAsString(dataListOption),
										$elm$core$Maybe$Just(
											$author$project$DatalistOption$getOptionValueAsString(dataListOption)))))));
				default:
					return $elm$core$Maybe$Nothing;
			}
		} else {
			switch (option.$) {
				case 0:
					var fancyOption = option.a;
					return $elm$core$Maybe$Just(
						$author$project$Option$DatalistOption(
							A2(
								$author$project$DatalistOption$setOptionDisplay,
								$author$project$FancyOption$getOptionDisplay(fancyOption),
								$author$project$DatalistOption$new(
									$author$project$FancyOption$getOptionValue(fancyOption)))));
				case 1:
					return $elm$core$Maybe$Just(option);
				default:
					return $elm$core$Maybe$Nothing;
			}
		}
	});
var $author$project$OptionList$transformOptionsToOutputStyle = F2(
	function (outputStyle, options) {
		return A2(
			$author$project$OptionList$mapValues,
			$author$project$Option$transformOptionForOutputStyle(outputStyle),
			options);
	});
var $author$project$OptionList$replaceOptions = F3(
	function (selectionConfig, oldOptions, newOptions) {
		var oldSelectedOptions = function () {
			var _v3 = $author$project$SelectionMode$getSelectionMode(selectionConfig);
			if (!_v3) {
				if ($author$project$OptionList$hasSelectedOption(newOptions)) {
					switch (oldOptions.$) {
						case 0:
							return $author$project$OptionList$FancyOptionList(_List_Nil);
						case 1:
							return $author$project$OptionList$DatalistOptionList(_List_Nil);
						default:
							return $author$project$OptionList$SlottedOptionList(_List_Nil);
					}
				} else {
					return $author$project$OptionList$selectedOptions(oldOptions);
				}
			} else {
				return A2(
					$author$project$OptionList$transformOptionsToOutputStyle,
					$author$project$SelectionMode$getOutputStyle(selectionConfig),
					$author$project$OptionList$selectedOptions(oldOptions));
			}
		}();
		var _v0 = $author$project$SelectionMode$getOutputStyle(selectionConfig);
		if (!_v0) {
			var _v1 = $author$project$SelectionMode$getSelectionMode(selectionConfig);
			if (!_v1) {
				return A4(
					$author$project$OptionList$mergeTwoListsOfOptionsPreservingSelectedOptions,
					$author$project$SelectionMode$getSelectionMode(selectionConfig),
					$author$project$SelectionMode$getSelectedItemPlacementMode(selectionConfig),
					oldSelectedOptions,
					newOptions);
			} else {
				return A4(
					$author$project$OptionList$mergeTwoListsOfOptionsPreservingSelectedOptions,
					$author$project$SelectionMode$getSelectionMode(selectionConfig),
					0,
					oldSelectedOptions,
					newOptions);
			}
		} else {
			var optionsForTheDatasetHints = $author$project$OptionList$removeEmptyOptions(
				A2(
					$author$project$OptionList$uniqueBy,
					$author$project$Option$getOptionValueAsString,
					A2(
						$author$project$OptionList$map,
						$author$project$Option$deselect,
						A2(
							$author$project$OptionList$filter,
							A2($elm$core$Basics$composeR, $author$project$Option$isSelected, $elm$core$Basics$not),
							newOptions))));
			var newSelectedOptions = $author$project$OptionList$toDatalistOptionList(oldSelectedOptions);
			var _v2 = A2($author$project$OptionList$append, newSelectedOptions, optionsForTheDatasetHints);
			switch (_v2.$) {
				case 1:
					var datalistOptions = _v2.a;
					return $author$project$OptionList$DatalistOptionList(datalistOptions);
				case 0:
					var options = _v2.a;
					return $author$project$OptionList$DatalistOptionList(options);
				default:
					var options = _v2.a;
					return $author$project$OptionList$DatalistOptionList(options);
			}
		}
	});
var $author$project$OptionList$clearAnyUnselectedCustomOptions = function (optionsList) {
	return A2(
		$author$project$OptionList$filter,
		function (option) {
			return !($author$project$Option$isCustomOption(option) && (!$author$project$Option$isSelected(option)));
		},
		optionsList);
};
var $author$project$OptionList$foldl = F3(
	function (_function, b, optionList) {
		switch (optionList.$) {
			case 0:
				var options = optionList.a;
				return A3($elm$core$List$foldl, _function, b, options);
			case 1:
				var options = optionList.a;
				return A3($elm$core$List$foldl, _function, b, options);
			default:
				var options = optionList.a;
				return A3($elm$core$List$foldl, _function, b, options);
		}
	});
var $author$project$OptionList$selectOptionByOptionValue = F2(
	function (value, list) {
		var nextSelectedIndex = A3(
			$author$project$OptionList$foldl,
			F2(
				function (selectedOption, highestIndex) {
					return (_Utils_cmp(
						$author$project$Option$getOptionSelectedIndex(selectedOption),
						highestIndex) > 0) ? $author$project$Option$getOptionSelectedIndex(selectedOption) : highestIndex;
				}),
			-1,
			list) + 1;
		return A3($author$project$OptionList$selectOptionByOptionValueWithIndex, nextSelectedIndex, value, list);
	});
var $author$project$OptionList$selectOption = F2(
	function (optionToSelect, options) {
		return A2(
			$author$project$OptionList$selectOptionByOptionValue,
			$author$project$Option$getOptionValue(optionToSelect),
			options);
	});
var $author$project$OptionList$selectSingleOption = F2(
	function (option, optionList) {
		return A2(
			$author$project$OptionList$selectSingleOptionByValue,
			$author$project$Option$getOptionValue(option),
			optionList);
	});
var $author$project$OptionList$selectHighlightedOption = F2(
	function (selectionMode, optionList) {
		if (!selectionMode) {
			return $author$project$OptionList$clearAnyUnselectedCustomOptions(
				A2(
					$elm$core$Maybe$withDefault,
					optionList,
					A2(
						$elm$core$Maybe$map,
						function (option) {
							return A2($author$project$OptionList$selectSingleOption, option, optionList);
						},
						$author$project$OptionList$head(
							A2(
								$author$project$OptionList$filter,
								function (option) {
									return $author$project$Option$isHighlighted(option);
								},
								optionList)))));
		} else {
			return A2(
				$elm$core$Maybe$withDefault,
				optionList,
				A2(
					$elm$core$Maybe$map,
					function (option) {
						return A2($author$project$OptionList$selectOption, option, optionList);
					},
					$author$project$OptionList$head(
						A2(
							$author$project$OptionList$filter,
							function (option) {
								return $author$project$Option$isHighlighted(option);
							},
							optionList))));
		}
	});
var $author$project$OptionList$selectedOptionValuesAreEqual = F2(
	function (valuesAsStrings, options) {
		switch (options.$) {
			case 0:
				return _Utils_eq(
					A2(
						$elm$core$List$map,
						$author$project$OptionValue$optionValueToString,
						A2(
							$elm$core$List$map,
							$author$project$Option$getOptionValue,
							$author$project$OptionList$getOptions(
								$author$project$OptionList$selectedOptions(options)))),
					valuesAsStrings);
			case 1:
				return _Utils_eq(
					A2(
						$elm$core$List$map,
						$author$project$OptionValue$optionValueToString,
						A2(
							$elm$core$List$map,
							$author$project$Option$getOptionValue,
							$author$project$OptionList$getOptions(
								A2(
									$author$project$OptionList$filter,
									A2($elm$core$Basics$composeR, $author$project$Option$isEmpty, $elm$core$Basics$not),
									$author$project$OptionList$selectedOptions(options))))),
					valuesAsStrings);
			default:
				return _Utils_eq(
					A2(
						$elm$core$List$map,
						$author$project$OptionValue$optionValueToString,
						A2(
							$elm$core$List$map,
							$author$project$Option$getOptionValue,
							$author$project$OptionList$getOptions(
								$author$project$OptionList$selectedOptions(options)))),
					valuesAsStrings);
		}
	});
var $author$project$OptionDisplay$setAge = F2(
	function (optionAge, optionDisplay) {
		switch (optionDisplay.$) {
			case 0:
				return $author$project$OptionDisplay$OptionShown(optionAge);
			case 1:
				return optionDisplay;
			case 2:
				var _int = optionDisplay.a;
				return A2($author$project$OptionDisplay$OptionSelected, _int, optionAge);
			case 3:
				return optionDisplay;
			case 4:
				return optionDisplay;
			case 5:
				return optionDisplay;
			case 6:
				return optionDisplay;
			case 8:
				return $author$project$OptionDisplay$OptionDisabled(optionAge);
			default:
				return $author$project$OptionDisplay$OptionActivated;
		}
	});
var $author$project$Option$setOptionDisplay = F2(
	function (optionDisplay, option) {
		switch (option.$) {
			case 0:
				var fancyOption = option.a;
				return $author$project$Option$FancyOption(
					A2($author$project$FancyOption$setOptionDisplay, optionDisplay, fancyOption));
			case 1:
				var datalistOption = option.a;
				return $author$project$Option$DatalistOption(
					A2($author$project$DatalistOption$setOptionDisplay, optionDisplay, datalistOption));
			default:
				var slottedOption = option.a;
				return $author$project$Option$SlottedOption(
					A2($author$project$SlottedOption$setOptionDisplay, optionDisplay, slottedOption));
		}
	});
var $author$project$Option$setOptionDisplayAge = F2(
	function (optionAge, option) {
		return A2(
			$author$project$Option$setOptionDisplay,
			A2(
				$author$project$OptionDisplay$setAge,
				optionAge,
				$author$project$Option$getOptionDisplay(option)),
			option);
	});
var $author$project$OptionList$setAge = F2(
	function (optionAge, optionList) {
		return A2(
			$author$project$OptionList$map,
			$author$project$Option$setOptionDisplayAge(optionAge),
			optionList);
	});
var $author$project$SelectionMode$setCustomOptions = F2(
	function (customOptions, selectionConfig) {
		if (!selectionConfig.$) {
			var singleSelectOutputStyle = selectionConfig.a;
			var placeholder = selectionConfig.b;
			var interactionState = selectionConfig.c;
			if (!singleSelectOutputStyle.$) {
				var singleSelectCustomHtmlFields = singleSelectOutputStyle.a;
				return A3(
					$author$project$SelectionMode$SingleSelectConfig,
					$author$project$OutputStyle$SingleSelectCustomHtml(
						_Utils_update(
							singleSelectCustomHtmlFields,
							{T: customOptions})),
					placeholder,
					interactionState);
			} else {
				return selectionConfig;
			}
		} else {
			var multiSelectOutputStyle = selectionConfig.a;
			var placeholder = selectionConfig.b;
			var interactionState = selectionConfig.c;
			if (!multiSelectOutputStyle.$) {
				var multiSelectCustomHtmlFields = multiSelectOutputStyle.a;
				return A3(
					$author$project$SelectionMode$MultiSelectConfig,
					$author$project$OutputStyle$MultiSelectCustomHtml(
						_Utils_update(
							multiSelectCustomHtmlFields,
							{T: customOptions})),
					placeholder,
					interactionState);
			} else {
				return selectionConfig;
			}
		}
	});
var $author$project$SelectionMode$setAllowCustomOptionsWithBool = F3(
	function (allowCustomOptions, customOptionHint, selectionConfig) {
		var transformAndValidate = $author$project$SelectionMode$getTransformAndValidate(selectionConfig);
		var newAllowCustomOptions = allowCustomOptions ? A2($author$project$OutputStyle$AllowCustomOptions, customOptionHint, transformAndValidate) : $author$project$OutputStyle$NoCustomOptions;
		return A2($author$project$SelectionMode$setCustomOptions, newAllowCustomOptions, selectionConfig);
	});
var $author$project$SelectionMode$setCustomOptionHint = F2(
	function (hint, selectionConfig) {
		var _v0 = $author$project$SelectionMode$getCustomOptionHint(selectionConfig);
		if (!_v0.$) {
			var transformAndValidate = $author$project$SelectionMode$getTransformAndValidate(selectionConfig);
			var newAllowCustomOptions = A2(
				$author$project$OutputStyle$AllowCustomOptions,
				$elm$core$Maybe$Just(hint),
				transformAndValidate);
			return A2($author$project$SelectionMode$setCustomOptions, newAllowCustomOptions, selectionConfig);
		} else {
			return selectionConfig;
		}
	});
var $author$project$SelectionMode$setDropdownStyle = F2(
	function (dropdownStyle, selectionConfig) {
		if (!selectionConfig.$) {
			var singleSelectOutputStyle = selectionConfig.a;
			var placeholder = selectionConfig.b;
			var interactionState = selectionConfig.c;
			if (!singleSelectOutputStyle.$) {
				var singleSelectCustomHtmlFields = singleSelectOutputStyle.a;
				return A3(
					$author$project$SelectionMode$SingleSelectConfig,
					$author$project$OutputStyle$SingleSelectCustomHtml(
						_Utils_update(
							singleSelectCustomHtmlFields,
							{V: dropdownStyle})),
					placeholder,
					interactionState);
			} else {
				return selectionConfig;
			}
		} else {
			var multiSelectOutputStyle = selectionConfig.a;
			var placeholder = selectionConfig.b;
			var interactionState = selectionConfig.c;
			if (!multiSelectOutputStyle.$) {
				var multiSelectCustomHtmlFields = multiSelectOutputStyle.a;
				return A3(
					$author$project$SelectionMode$MultiSelectConfig,
					$author$project$OutputStyle$MultiSelectCustomHtml(
						_Utils_update(
							multiSelectCustomHtmlFields,
							{V: dropdownStyle})),
					placeholder,
					interactionState);
			} else {
				return selectionConfig;
			}
		}
	});
var $author$project$OutputStyle$setEventsModeMultiSelect = F2(
	function (eventsMode, multiSelectOutputStyle) {
		if (!multiSelectOutputStyle.$) {
			var multiSelectCustomHtmlFields = multiSelectOutputStyle.a;
			return $author$project$OutputStyle$MultiSelectCustomHtml(
				_Utils_update(
					multiSelectCustomHtmlFields,
					{J: eventsMode}));
		} else {
			var valueTransformAndValidate = multiSelectOutputStyle.b;
			return A2($author$project$OutputStyle$MultiSelectDataList, eventsMode, valueTransformAndValidate);
		}
	});
var $author$project$OutputStyle$setEventsModeSingleSelect = F2(
	function (eventsMode, singleSelectOutputStyle) {
		if (!singleSelectOutputStyle.$) {
			var singleSelectCustomHtmlFields = singleSelectOutputStyle.a;
			return $author$project$OutputStyle$SingleSelectCustomHtml(
				_Utils_update(
					singleSelectCustomHtmlFields,
					{J: eventsMode}));
		} else {
			var valueTransformAndValidate = singleSelectOutputStyle.b;
			return A2($author$project$OutputStyle$SingleSelectDatalist, eventsMode, valueTransformAndValidate);
		}
	});
var $author$project$SelectionMode$setEventsMode = F2(
	function (eventsMode, selectionConfig) {
		if (!selectionConfig.$) {
			var singleSelectOutputStyle = selectionConfig.a;
			var placeholder = selectionConfig.b;
			var interactionState = selectionConfig.c;
			return A3(
				$author$project$SelectionMode$SingleSelectConfig,
				A2($author$project$OutputStyle$setEventsModeSingleSelect, eventsMode, singleSelectOutputStyle),
				placeholder,
				interactionState);
		} else {
			var multiSelectOutputStyle = selectionConfig.a;
			var placeholder = selectionConfig.b;
			var interactionState = selectionConfig.c;
			return A3(
				$author$project$SelectionMode$MultiSelectConfig,
				A2($author$project$OutputStyle$setEventsModeMultiSelect, eventsMode, multiSelectOutputStyle),
				placeholder,
				interactionState);
		}
	});
var $author$project$SelectionMode$setEventsOnly = F2(
	function (bool, selectionConfig) {
		var newEventsMode = bool ? 0 : 1;
		return A2($author$project$SelectionMode$setEventsMode, newEventsMode, selectionConfig);
	});
var $author$project$SelectionMode$setInteractionState = F2(
	function (newInteractionState, selectionConfig) {
		if (!selectionConfig.$) {
			var singleSelectOutputStyle = selectionConfig.a;
			var placeholder = selectionConfig.b;
			return A3($author$project$SelectionMode$SingleSelectConfig, singleSelectOutputStyle, placeholder, newInteractionState);
		} else {
			var multiSelectOutputStyle = selectionConfig.a;
			var placeholder = selectionConfig.b;
			return A3($author$project$SelectionMode$MultiSelectConfig, multiSelectOutputStyle, placeholder, newInteractionState);
		}
	});
var $author$project$SelectionMode$setIsDisabled = F2(
	function (isDisabled_, selectionConfig) {
		return isDisabled_ ? A2($author$project$SelectionMode$setInteractionState, 2, selectionConfig) : A2($author$project$SelectionMode$setInteractionState, 1, selectionConfig);
	});
var $author$project$SelectionMode$Focused = 0;
var $author$project$SelectionMode$setIsFocused = F2(
	function (isFocused_, selectionConfig) {
		var newInteractionState = isFocused_ ? 0 : 1;
		return A2($author$project$SelectionMode$setInteractionState, newInteractionState, selectionConfig);
	});
var $author$project$SelectionMode$setMaxDropdownItems = F2(
	function (maxDropdownItems, selectionConfig) {
		if (!selectionConfig.$) {
			var singleSelectOutputStyle = selectionConfig.a;
			var placeholder = selectionConfig.b;
			var interactionState = selectionConfig.c;
			if (!singleSelectOutputStyle.$) {
				var singleSelectCustomHtmlFields = singleSelectOutputStyle.a;
				return A3(
					$author$project$SelectionMode$SingleSelectConfig,
					$author$project$OutputStyle$SingleSelectCustomHtml(
						_Utils_update(
							singleSelectCustomHtmlFields,
							{bp: maxDropdownItems})),
					placeholder,
					interactionState);
			} else {
				return selectionConfig;
			}
		} else {
			var multiSelectOutputStyle = selectionConfig.a;
			var placeholder = selectionConfig.b;
			var interactionState = selectionConfig.c;
			if (!multiSelectOutputStyle.$) {
				var multiSelectCustomHtmlFields = multiSelectOutputStyle.a;
				return A3(
					$author$project$SelectionMode$MultiSelectConfig,
					$author$project$OutputStyle$MultiSelectCustomHtml(
						_Utils_update(
							multiSelectCustomHtmlFields,
							{bp: maxDropdownItems})),
					placeholder,
					interactionState);
			} else {
				return selectionConfig;
			}
		}
	});
var $author$project$OutputStyle$multiToSingle = function (multiSelectOutputStyle) {
	if (!multiSelectOutputStyle.$) {
		var multiSelectCustomHtmlFields = multiSelectOutputStyle.a;
		return $author$project$OutputStyle$SingleSelectCustomHtml(
			{T: multiSelectCustomHtmlFields.T, U: multiSelectCustomHtmlFields.U, V: multiSelectCustomHtmlFields.V, J: multiSelectCustomHtmlFields.J, bp: multiSelectCustomHtmlFields.bp, bB: multiSelectCustomHtmlFields.bB, bC: 0});
	} else {
		var eventsMode = multiSelectOutputStyle.a;
		var transformAndValidate = multiSelectOutputStyle.b;
		return A2($author$project$OutputStyle$SingleSelectDatalist, eventsMode, transformAndValidate);
	}
};
var $author$project$OutputStyle$singleToMulti = function (singleSelectOutputStyle) {
	if (!singleSelectOutputStyle.$) {
		var singleSelectCustomHtmlFields = singleSelectOutputStyle.a;
		return $author$project$OutputStyle$MultiSelectCustomHtml(
			{T: singleSelectCustomHtmlFields.T, U: singleSelectCustomHtmlFields.U, V: singleSelectCustomHtmlFields.V, J: singleSelectCustomHtmlFields.J, bp: singleSelectCustomHtmlFields.bp, bB: singleSelectCustomHtmlFields.bB, bH: 1});
	} else {
		var eventsMode = singleSelectOutputStyle.a;
		var transformAndValidate = singleSelectOutputStyle.b;
		return A2($author$project$OutputStyle$MultiSelectDataList, eventsMode, transformAndValidate);
	}
};
var $author$project$SelectionMode$setMultiSelectModeWithBool = F2(
	function (isInMultiSelectMode, selectionConfig) {
		if (!selectionConfig.$) {
			var singleSelectOutputStyle = selectionConfig.a;
			var placeholder = selectionConfig.b;
			var interactionState = selectionConfig.c;
			return isInMultiSelectMode ? A3(
				$author$project$SelectionMode$MultiSelectConfig,
				$author$project$OutputStyle$singleToMulti(singleSelectOutputStyle),
				placeholder,
				interactionState) : selectionConfig;
		} else {
			var multiSelectOutputStyle = selectionConfig.a;
			var placeholder = selectionConfig.b;
			var interactionState = selectionConfig.c;
			return isInMultiSelectMode ? selectionConfig : A3(
				$author$project$SelectionMode$SingleSelectConfig,
				$author$project$OutputStyle$multiToSingle(multiSelectOutputStyle),
				placeholder,
				interactionState);
		}
	});
var $author$project$OutputStyle$defaultMultiSelectCustomHtmlFields = {
	T: $author$project$OutputStyle$NoCustomOptions,
	U: 1,
	V: 0,
	J: 1,
	bp: $author$project$OutputStyle$NoLimitToDropdownItems,
	bB: $author$project$OutputStyle$FixedSearchStringMinimumLength(
		$author$project$PositiveInt$new(2)),
	bH: 0
};
var $author$project$OutputStyle$defaultSingleSelectCustomHtmlFields = {
	T: $author$project$OutputStyle$NoCustomOptions,
	U: 1,
	V: 0,
	J: 1,
	bp: $author$project$OutputStyle$NoLimitToDropdownItems,
	bB: $author$project$OutputStyle$FixedSearchStringMinimumLength(
		$author$project$PositiveInt$new(2)),
	bC: 0
};
var $author$project$SelectionMode$getCustomOptionsFromDomStateCache = function (domStateCache) {
	var _v0 = domStateCache.a6;
	switch (_v0.$) {
		case 0:
			return $author$project$OutputStyle$NoCustomOptions;
		case 1:
			return A2($author$project$OutputStyle$AllowCustomOptions, $elm$core$Maybe$Nothing, $author$project$TransformAndValidate$empty);
		default:
			var string = _v0.a;
			return A2(
				$author$project$OutputStyle$AllowCustomOptions,
				$elm$core$Maybe$Just(string),
				$author$project$TransformAndValidate$empty);
	}
};
var $author$project$SelectionMode$setOutputStyle = F3(
	function (domStateCache, outputStyle, selectionConfig) {
		if (!outputStyle) {
			if (!selectionConfig.$) {
				var singleSelectOutputStyle = selectionConfig.a;
				var placeholder = selectionConfig.b;
				var interactionState = selectionConfig.c;
				if (!singleSelectOutputStyle.$) {
					return selectionConfig;
				} else {
					var customOptions = $author$project$SelectionMode$getCustomOptionsFromDomStateCache(domStateCache);
					var singleSelectCustomHtmlFields = _Utils_update(
						$author$project$OutputStyle$defaultSingleSelectCustomHtmlFields,
						{T: customOptions});
					return A3(
						$author$project$SelectionMode$SingleSelectConfig,
						$author$project$OutputStyle$SingleSelectCustomHtml(singleSelectCustomHtmlFields),
						placeholder,
						interactionState);
				}
			} else {
				var multiSelectOutputStyle = selectionConfig.a;
				var placeholder = selectionConfig.b;
				var interactionState = selectionConfig.c;
				if (!multiSelectOutputStyle.$) {
					return selectionConfig;
				} else {
					var customOptions = $author$project$SelectionMode$getCustomOptionsFromDomStateCache(domStateCache);
					var multiSelectCustomHtmlFields = _Utils_update(
						$author$project$OutputStyle$defaultMultiSelectCustomHtmlFields,
						{T: customOptions});
					return A3(
						$author$project$SelectionMode$MultiSelectConfig,
						$author$project$OutputStyle$MultiSelectCustomHtml(multiSelectCustomHtmlFields),
						placeholder,
						interactionState);
				}
			}
		} else {
			if (!selectionConfig.$) {
				var singleSelectOutputStyle = selectionConfig.a;
				var placeholder = selectionConfig.b;
				var interactionState = selectionConfig.c;
				if (!singleSelectOutputStyle.$) {
					var fields = singleSelectOutputStyle.a;
					return A3(
						$author$project$SelectionMode$SingleSelectConfig,
						A2(
							$author$project$OutputStyle$SingleSelectDatalist,
							fields.J,
							$author$project$OutputStyle$getTransformAndValidateFromCustomOptions(fields.T)),
						placeholder,
						interactionState);
				} else {
					return selectionConfig;
				}
			} else {
				var multiSelectOutputStyle = selectionConfig.a;
				var placeholder = selectionConfig.b;
				var interactionState = selectionConfig.c;
				if (!multiSelectOutputStyle.$) {
					var fields = multiSelectOutputStyle.a;
					return A3(
						$author$project$SelectionMode$MultiSelectConfig,
						A2(
							$author$project$OutputStyle$MultiSelectDataList,
							fields.J,
							$author$project$OutputStyle$getTransformAndValidateFromCustomOptions(fields.T)),
						placeholder,
						interactionState);
				} else {
					return selectionConfig;
				}
			}
		}
	});
var $author$project$SelectionMode$setPlaceholder = F2(
	function (placeholder, selectionConfig) {
		if (!selectionConfig.$) {
			var singleSelectOutputStyle = selectionConfig.a;
			var interactionState = selectionConfig.c;
			return A3($author$project$SelectionMode$SingleSelectConfig, singleSelectOutputStyle, placeholder, interactionState);
		} else {
			var multiSelectOutputStyle = selectionConfig.a;
			var interactionState = selectionConfig.c;
			return A3($author$project$SelectionMode$MultiSelectConfig, multiSelectOutputStyle, placeholder, interactionState);
		}
	});
var $author$project$SelectionMode$setSearchStringMinimumLength = F2(
	function (newSearchStringMinimumLength, selectionConfig) {
		if (!selectionConfig.$) {
			var singleSelectOutputStyle = selectionConfig.a;
			var placeholder = selectionConfig.b;
			var interactionState = selectionConfig.c;
			if (!singleSelectOutputStyle.$) {
				var singleSelectCustomHtmlFields = singleSelectOutputStyle.a;
				return A3(
					$author$project$SelectionMode$SingleSelectConfig,
					$author$project$OutputStyle$SingleSelectCustomHtml(
						_Utils_update(
							singleSelectCustomHtmlFields,
							{bB: newSearchStringMinimumLength})),
					placeholder,
					interactionState);
			} else {
				return selectionConfig;
			}
		} else {
			var multiSelectOutputStyle = selectionConfig.a;
			var placeholder = selectionConfig.b;
			var interactionState = selectionConfig.c;
			if (!multiSelectOutputStyle.$) {
				var multiSelectCustomHtmlFields = multiSelectOutputStyle.a;
				return A3(
					$author$project$SelectionMode$MultiSelectConfig,
					$author$project$OutputStyle$MultiSelectCustomHtml(
						_Utils_update(
							multiSelectCustomHtmlFields,
							{bB: newSearchStringMinimumLength})),
					placeholder,
					interactionState);
			} else {
				return selectionConfig;
			}
		}
	});
var $author$project$SelectionMode$setSelectedItemPlacementMode = F2(
	function (selectedItemPlacementMode, selectionConfig) {
		if (!selectionConfig.$) {
			var singleSelectOutputStyle = selectionConfig.a;
			var placeholder = selectionConfig.b;
			var interactionState = selectionConfig.c;
			if (!singleSelectOutputStyle.$) {
				var singleSelectCustomHtmlFields = singleSelectOutputStyle.a;
				return A3(
					$author$project$SelectionMode$SingleSelectConfig,
					$author$project$OutputStyle$SingleSelectCustomHtml(
						_Utils_update(
							singleSelectCustomHtmlFields,
							{bC: selectedItemPlacementMode})),
					placeholder,
					interactionState);
			} else {
				return selectionConfig;
			}
		} else {
			return selectionConfig;
		}
	});
var $author$project$SelectionMode$setSelectedItemStaysInPlaceWithBool = F2(
	function (selectedItemStaysInPlace, selectionConfig) {
		return selectedItemStaysInPlace ? A2($author$project$SelectionMode$setSelectedItemPlacementMode, 0, selectionConfig) : A2($author$project$SelectionMode$setSelectedItemPlacementMode, 1, selectionConfig);
	});
var $author$project$OutputStyle$Expanded = 0;
var $author$project$SelectionMode$setShowDropdown = F2(
	function (showDropdown_, selectionConfig) {
		var newDropdownState = showDropdown_ ? 0 : 1;
		if (!selectionConfig.$) {
			var singleSelectOutputStyle = selectionConfig.a;
			var placeholder = selectionConfig.b;
			var interactionState = selectionConfig.c;
			if (!singleSelectOutputStyle.$) {
				var singleSelectCustomHtmlFields = singleSelectOutputStyle.a;
				return A3(
					$author$project$SelectionMode$SingleSelectConfig,
					$author$project$OutputStyle$SingleSelectCustomHtml(
						_Utils_update(
							singleSelectCustomHtmlFields,
							{U: newDropdownState})),
					placeholder,
					interactionState);
			} else {
				return selectionConfig;
			}
		} else {
			var multiSelectOutputStyle = selectionConfig.a;
			var placeholder = selectionConfig.b;
			var interactionState = selectionConfig.c;
			if (!multiSelectOutputStyle.$) {
				var multiSelectCustomHtmlFields = multiSelectOutputStyle.a;
				return A3(
					$author$project$SelectionMode$MultiSelectConfig,
					$author$project$OutputStyle$MultiSelectCustomHtml(
						_Utils_update(
							multiSelectCustomHtmlFields,
							{U: newDropdownState})),
					placeholder,
					interactionState);
			} else {
				return selectionConfig;
			}
		}
	});
var $author$project$SelectionMode$setSingleItemRemoval = F2(
	function (newSingleItemRemoval, selectionConfig) {
		if (!selectionConfig.$) {
			return selectionConfig;
		} else {
			var multiSelectOutputStyle = selectionConfig.a;
			var placeholder = selectionConfig.b;
			var interactionState = selectionConfig.c;
			if (!multiSelectOutputStyle.$) {
				var multiSelectCustomHtmlFields = multiSelectOutputStyle.a;
				return A3(
					$author$project$SelectionMode$MultiSelectConfig,
					$author$project$OutputStyle$MultiSelectCustomHtml(
						_Utils_update(
							multiSelectCustomHtmlFields,
							{bH: newSingleItemRemoval})),
					placeholder,
					interactionState);
			} else {
				return selectionConfig;
			}
		}
	});
var $author$project$OutputStyle$setTransformAndValidateFromCustomOptions = F2(
	function (newTransformAndValidate, customOptions) {
		if (!customOptions.$) {
			var hint = customOptions.a;
			return A2($author$project$OutputStyle$AllowCustomOptions, hint, newTransformAndValidate);
		} else {
			return customOptions;
		}
	});
var $author$project$SelectionMode$setTransformAndValidate = F2(
	function (newTransformAndValidate, selectionConfig) {
		if (!selectionConfig.$) {
			var singleSelectOutputStyle = selectionConfig.a;
			var placeholder = selectionConfig.b;
			var interactionState = selectionConfig.c;
			if (!singleSelectOutputStyle.$) {
				var singleSelectCustomHtmlFields = singleSelectOutputStyle.a;
				var newSingleSelectCustomFields = _Utils_update(
					singleSelectCustomHtmlFields,
					{
						T: A2($author$project$OutputStyle$setTransformAndValidateFromCustomOptions, newTransformAndValidate, singleSelectCustomHtmlFields.T)
					});
				return A3(
					$author$project$SelectionMode$SingleSelectConfig,
					$author$project$OutputStyle$SingleSelectCustomHtml(newSingleSelectCustomFields),
					placeholder,
					interactionState);
			} else {
				var eventsMode = singleSelectOutputStyle.a;
				return A3(
					$author$project$SelectionMode$SingleSelectConfig,
					A2($author$project$OutputStyle$SingleSelectDatalist, eventsMode, newTransformAndValidate),
					placeholder,
					interactionState);
			}
		} else {
			var multiSelectOutputStyle = selectionConfig.a;
			var placeholder = selectionConfig.b;
			var interactionState = selectionConfig.c;
			if (!multiSelectOutputStyle.$) {
				var multiSelectCustomHtmlFields = multiSelectOutputStyle.a;
				var newMultiSelectCustomHtmlFields = _Utils_update(
					multiSelectCustomHtmlFields,
					{
						T: A2($author$project$OutputStyle$setTransformAndValidateFromCustomOptions, newTransformAndValidate, multiSelectCustomHtmlFields.T)
					});
				return A3(
					$author$project$SelectionMode$MultiSelectConfig,
					$author$project$OutputStyle$MultiSelectCustomHtml(newMultiSelectCustomHtmlFields),
					placeholder,
					interactionState);
			} else {
				var eventsMode = multiSelectOutputStyle.a;
				return A3(
					$author$project$SelectionMode$MultiSelectConfig,
					A2($author$project$OutputStyle$MultiSelectDataList, eventsMode, newTransformAndValidate),
					placeholder,
					interactionState);
			}
		}
	});
var $author$project$Option$toggleHighlight = function (option) {
	return $author$project$Option$isHighlighted(option) ? $author$project$Option$removeHighlight(option) : $author$project$Option$highlight(option);
};
var $author$project$OptionList$toggleSelectedHighlightByOptionValue = F2(
	function (optionValue, optionList) {
		return A2(
			$author$project$OptionList$map,
			function (option) {
				return A2($author$project$Option$optionEqualsOptionValue, optionValue, option) ? $author$project$Option$toggleHighlight(option) : option;
			},
			optionList);
	});
var $author$project$TransformAndValidate$transformAndValidateFirstPass = F3(
	function (_v0, string, selectedValueIndex) {
		var transformers = _v0.a;
		var validators = _v0.b;
		var transformedString = A3(
			$elm_community$list_extra$List$Extra$mapAccuml,
			F2(
				function (str, t) {
					return _Utils_Tuple2(
						A2($author$project$TransformAndValidate$transform, t, str),
						t);
				}),
			string,
			transformers).a;
		return A2(
			$author$project$TransformAndValidate$rollUpErrors,
			transformedString,
			A2(
				$elm$core$List$map,
				function (validator) {
					return A3($author$project$TransformAndValidate$validate, validator, transformedString, selectedValueIndex);
				},
				validators));
	});
var $author$project$TransformAndValidate$getSelectedValueIndexFromCustomValidationResult = function (customValidationResult) {
	if (!customValidationResult.$) {
		var selectedValueIndex = customValidationResult.b;
		return selectedValueIndex;
	} else {
		var selectedValueIndex = customValidationResult.b;
		return selectedValueIndex;
	}
};
var $author$project$TransformAndValidate$getValueStringFromCustomValidationResult = function (customValidationResult) {
	if (!customValidationResult.$) {
		var string = customValidationResult.a;
		return string;
	} else {
		var string = customValidationResult.a;
		return string;
	}
};
var $author$project$TransformAndValidate$transformAndValidateSecondPass = F2(
	function (_v0, customValidationResult) {
		var transformers = _v0.a;
		var validators = _v0.b;
		var valueString = $author$project$TransformAndValidate$getValueStringFromCustomValidationResult(customValidationResult);
		var transformedString = A3(
			$elm_community$list_extra$List$Extra$mapAccuml,
			F2(
				function (str, t) {
					return _Utils_Tuple2(
						A2($author$project$TransformAndValidate$transform, t, str),
						t);
				}),
			valueString,
			transformers).a;
		var selectedValueIndex = $author$project$TransformAndValidate$getSelectedValueIndexFromCustomValidationResult(customValidationResult);
		return A2(
			$author$project$TransformAndValidate$rollUpErrors,
			transformedString,
			A2(
				$elm$core$List$map,
				function (result) {
					switch (result.$) {
						case 0:
							return result;
						case 1:
							return result;
						default:
							if (!customValidationResult.$) {
								var selectedValueIndex_ = customValidationResult.b;
								return A2($author$project$TransformAndValidate$ValidationPass, valueString, selectedValueIndex_);
							} else {
								var valueString_ = customValidationResult.a;
								var selectedValueIndex_ = customValidationResult.b;
								var errorMessage = customValidationResult.c;
								return A3($author$project$TransformAndValidate$ValidationFailed, valueString_, selectedValueIndex_, errorMessage);
							}
					}
				},
				A2(
					$elm$core$List$map,
					function (validator) {
						return A3($author$project$TransformAndValidate$validate, validator, transformedString, selectedValueIndex);
					},
					validators)));
	});
var $author$project$OptionList$unhighlightOptionByValue = F2(
	function (optionValue, optionList) {
		return A2(
			$author$project$OptionList$map,
			function (option_) {
				return A2($author$project$Option$optionEqualsOptionValue, optionValue, option_) ? $author$project$Option$removeHighlight(option_) : option_;
			},
			optionList);
	});
var $author$project$OptionList$unhighlightSelectedOptions = function (optionList) {
	return A2(
		$author$project$OptionList$map,
		function (option_) {
			return $author$project$Option$isSelected(option_) ? $author$project$Option$removeHighlight(option_) : option_;
		},
		optionList);
};
var $author$project$SearchString$update = function (string) {
	return A2($author$project$SearchString$SearchString, string, false);
};
var $author$project$OptionList$updateAge = F4(
	function (outputStyle, searchString, searchStringMinimumLength, optionList) {
		if (!outputStyle) {
			if (!searchStringMinimumLength.$) {
				var min = searchStringMinimumLength.a;
				return (_Utils_cmp(
					$author$project$SearchString$length(searchString),
					$author$project$PositiveInt$toInt(min)) > 0) ? optionList : A2($author$project$OptionList$setAge, 1, optionList);
			} else {
				return optionList;
			}
		} else {
			return A2($author$project$OptionList$setAge, 1, optionList);
		}
	});
var $author$project$DomStateCache$updateAllowCustomOptions = F2(
	function (customOptions, domStateCache) {
		return _Utils_update(
			domStateCache,
			{a6: customOptions});
	});
var $author$project$Option$hasSelectedItemIndex = F2(
	function (selectedItemIndex, option) {
		return _Utils_eq(
			$author$project$Option$getOptionSelectedIndex(option),
			selectedItemIndex);
	});
var $author$project$OptionDisplay$selectedAndPendingValidation = function (index) {
	return $author$project$OptionDisplay$OptionSelectedPendingValidation(index);
};
var $author$project$DatalistOption$newSelectedDatalistOptionPendingValidation = F2(
	function (optionValue, selectedIndex) {
		return A2(
			$author$project$DatalistOption$DatalistOption,
			$author$project$OptionDisplay$selectedAndPendingValidation(selectedIndex),
			optionValue);
	});
var $author$project$DatalistOption$setOptionValue = F2(
	function (optionValue, datalistOption) {
		var optionDisplay = datalistOption.a;
		return A2($author$project$DatalistOption$DatalistOption, optionDisplay, optionValue);
	});
var $author$project$SlottedOption$setOptionValue = F2(
	function (optionValue, slottedOption) {
		var optionDisplay = slottedOption.a;
		var optionSlot = slottedOption.c;
		return A3($author$project$SlottedOption$SlottedOption, optionDisplay, optionValue, optionSlot);
	});
var $author$project$Option$setOptionValue = F2(
	function (optionValue, option) {
		switch (option.$) {
			case 0:
				var fancyOption = option.a;
				return $author$project$Option$FancyOption(
					A2($author$project$FancyOption$setOptionValue, optionValue, fancyOption));
			case 1:
				var datalistOption = option.a;
				return $author$project$Option$DatalistOption(
					A2($author$project$DatalistOption$setOptionValue, optionValue, datalistOption));
			default:
				var slottedOption = option.a;
				return $author$project$Option$SlottedOption(
					A2($author$project$SlottedOption$setOptionValue, optionValue, slottedOption));
		}
	});
var $author$project$OptionList$updateDatalistOptionWithValueBySelectedValueIndexPendingValidation = F3(
	function (optionValue, selectedIndex, optionList) {
		return A2(
			$author$project$OptionList$map,
			function (option) {
				return _Utils_eq(
					$author$project$Option$getOptionSelectedIndex(option),
					selectedIndex) ? A2(
					$author$project$Option$setOptionDisplay,
					$author$project$OptionDisplay$OptionSelectedPendingValidation(selectedIndex),
					A2($author$project$Option$setOptionValue, optionValue, option)) : option;
			},
			optionList);
	});
var $author$project$OptionList$updateDatalistOptionsWithPendingValidation = F3(
	function (optionValue, selectedValueIndex, optionList) {
		return A2(
			$author$project$OptionList$any,
			$author$project$Option$hasSelectedItemIndex(selectedValueIndex),
			optionList) ? A3($author$project$OptionList$updateDatalistOptionWithValueBySelectedValueIndexPendingValidation, optionValue, selectedValueIndex, optionList) : A2(
			$author$project$OptionList$append,
			$author$project$OptionList$DatalistOptionList(
				_List_fromArray(
					[
						$author$project$Option$DatalistOption(
						A2($author$project$DatalistOption$newSelectedDatalistOptionPendingValidation, optionValue, selectedValueIndex))
					])),
			optionList);
	});
var $author$project$OptionDisplay$setErrors = F2(
	function (validationErrorMessages, optionDisplay) {
		switch (optionDisplay.$) {
			case 0:
				return optionDisplay;
			case 1:
				return optionDisplay;
			case 2:
				var selectedIndex = optionDisplay.a;
				return ($elm$core$List$length(validationErrorMessages) > 0) ? A2($author$project$OptionDisplay$OptionSelectedAndInvalid, selectedIndex, validationErrorMessages) : optionDisplay;
			case 4:
				var selectedIndex = optionDisplay.a;
				return ($elm$core$List$length(validationErrorMessages) > 0) ? A2($author$project$OptionDisplay$OptionSelectedAndInvalid, selectedIndex, validationErrorMessages) : optionDisplay;
			case 3:
				var selectedIndex = optionDisplay.a;
				return A2($author$project$OptionDisplay$OptionSelectedAndInvalid, selectedIndex, validationErrorMessages);
			case 5:
				return optionDisplay;
			case 6:
				return optionDisplay;
			case 8:
				return optionDisplay;
			default:
				return optionDisplay;
		}
	});
var $author$project$Option$setOptionValueErrors = F2(
	function (validationFailures, option) {
		var newOptionDisplay = A2(
			$author$project$OptionDisplay$setErrors,
			validationFailures,
			$author$project$Option$getOptionDisplay(option));
		return A2($author$project$Option$setOptionDisplay, newOptionDisplay, option);
	});
var $author$project$OptionList$updateDatalistOptionWithValueBySelectedValueIndex = F4(
	function (errors, optionValue, selectedIndex, optionList) {
		return $elm$core$List$isEmpty(errors) ? A2(
			$author$project$OptionList$map,
			function (option) {
				return _Utils_eq(
					$author$project$Option$getOptionSelectedIndex(option),
					selectedIndex) ? A2(
					$author$project$Option$setOptionDisplay,
					A2($author$project$OptionDisplay$OptionSelected, selectedIndex, 1),
					A2($author$project$Option$setOptionValue, optionValue, option)) : option;
			},
			optionList) : A2(
			$author$project$OptionList$map,
			function (option) {
				return _Utils_eq(
					$author$project$Option$getOptionSelectedIndex(option),
					selectedIndex) ? A2(
					$author$project$Option$setOptionValueErrors,
					errors,
					A2($author$project$Option$setOptionValue, optionValue, option)) : option;
			},
			optionList);
	});
var $author$project$OptionList$updateDatalistOptionsWithValue = F3(
	function (optionValue, selectedValueIndex, optionList) {
		return A2(
			$author$project$OptionList$any,
			$author$project$Option$hasSelectedItemIndex(selectedValueIndex),
			optionList) ? A4($author$project$OptionList$updateDatalistOptionWithValueBySelectedValueIndex, _List_Nil, optionValue, selectedValueIndex, optionList) : A2(
			$author$project$OptionList$append,
			$author$project$OptionList$DatalistOptionList(
				_List_fromArray(
					[
						$author$project$Option$DatalistOption(
						A2($author$project$DatalistOption$newSelected, optionValue, selectedValueIndex))
					])),
			optionList);
	});
var $author$project$OptionDisplay$selectedAndInvalid = F2(
	function (index, validationFailureMessages) {
		return A2($author$project$OptionDisplay$OptionSelectedAndInvalid, index, validationFailureMessages);
	});
var $author$project$DatalistOption$newSelectedDatalistOptionWithErrors = F3(
	function (errors, optionValue, selectedIndex) {
		return A2(
			$author$project$DatalistOption$DatalistOption,
			A2($author$project$OptionDisplay$selectedAndInvalid, selectedIndex, errors),
			optionValue);
	});
var $author$project$OptionList$updateDatalistOptionsWithValueAndErrors = F4(
	function (errors, optionValue, selectedValueIndex, optionList) {
		return A2(
			$author$project$OptionList$any,
			$author$project$Option$hasSelectedItemIndex(selectedValueIndex),
			optionList) ? A4($author$project$OptionList$updateDatalistOptionWithValueBySelectedValueIndex, errors, optionValue, selectedValueIndex, optionList) : A2(
			$author$project$OptionList$append,
			$author$project$OptionList$DatalistOptionList(
				_List_fromArray(
					[
						$author$project$Option$DatalistOption(
						A3($author$project$DatalistOption$newSelectedDatalistOptionWithErrors, errors, optionValue, selectedValueIndex))
					])),
			optionList);
	});
var $author$project$DomStateCache$updateDisabledAttribute = F2(
	function (disabledAttribute, domStateCache) {
		return _Utils_update(
			domStateCache,
			{bd: disabledAttribute});
	});
var $author$project$MuchSelect$updatePartOfTheModelWithChangesThatEffectTheOptionsWhenTheMouseMoves = F4(
	function (rightSlot, selectionMode, options, model) {
		return _Utils_update(
			model,
			{
				d: A4(
					$author$project$RightSlot$updateRightSlot,
					rightSlot,
					$author$project$SelectionMode$getOutputStyle(selectionMode),
					$author$project$SelectionMode$getSelectionMode(selectionMode),
					$author$project$OptionList$selectedOptions(options))
			});
	});
var $author$project$MuchSelect$updateModelWithChangesThatEffectTheOptionsWhenTheMouseMoves = function (model) {
	return A4($author$project$MuchSelect$updatePartOfTheModelWithChangesThatEffectTheOptionsWhenTheMouseMoves, model.d, model.a, model.b, model);
};
var $author$project$FancyOption$setOptionSearchFilter = F2(
	function (searchFilter, option) {
		switch (option.$) {
			case 0:
				var display = option.a;
				var label = option.b;
				var value = option.c;
				var description = option.d;
				var group = option.e;
				var part = option.f;
				return A7($author$project$FancyOption$FancyOption, display, label, value, description, group, part, searchFilter);
			case 1:
				var display = option.a;
				var label = option.b;
				var value = option.c;
				return A4($author$project$FancyOption$CustomFancyOption, display, label, value, searchFilter);
			default:
				return option;
		}
	});
var $author$project$Option$setOptionSearchFilter = F2(
	function (maybeOptionSearchFilter, option) {
		switch (option.$) {
			case 0:
				var fancyOption = option.a;
				return $author$project$Option$FancyOption(
					A2($author$project$FancyOption$setOptionSearchFilter, maybeOptionSearchFilter, fancyOption));
			case 1:
				return option;
			default:
				return option;
		}
	});
var $author$project$OptionList$updateOptionsWithNewSearchResults = F2(
	function (optionSearchFilterWithValues, optionList) {
		var findNewSearchFilterResult = F2(
			function (optionValue, results) {
				return A2(
					$elm_community$list_extra$List$Extra$find,
					function (result) {
						return _Utils_eq(result.ei, optionValue);
					},
					results);
			});
		return A2(
			$author$project$OptionList$map,
			function (option) {
				var _v0 = A2(
					findNewSearchFilterResult,
					$author$project$Option$getOptionValue(option),
					optionSearchFilterWithValues);
				if (!_v0.$) {
					var result = _v0.a;
					return A2($author$project$Option$setOptionSearchFilter, result.dx, option);
				} else {
					return A2($author$project$Option$setOptionSearchFilter, $elm$core$Maybe$Nothing, option);
				}
			},
			optionList);
	});
var $author$project$DomStateCache$updateOutputStyle = F2(
	function (outputStyleAttribute, domStateCache) {
		return _Utils_update(
			domStateCache,
			{bx: outputStyleAttribute});
	});
var $author$project$RightSlot$updateRightSlotLoading = F4(
	function (current, selectionConfig, selectedOptionList, isLoading_) {
		if (isLoading_) {
			return $author$project$RightSlot$ShowLoadingIndicator;
		} else {
			var _v0 = $author$project$SelectionMode$getSelectionMode(selectionConfig);
			if (!_v0) {
				var _v1 = $author$project$SelectionMode$getOutputStyle(selectionConfig);
				if (!_v1) {
					switch (current.$) {
						case 0:
							return $author$project$RightSlot$ShowDropdownIndicator(1);
						case 1:
							return $author$project$OptionList$isEmpty(selectedOptionList) ? $author$project$RightSlot$ShowDropdownIndicator(1) : $author$project$RightSlot$ShowClearButton;
						case 2:
							var focusTransition = current.a;
							return $author$project$RightSlot$ShowDropdownIndicator(focusTransition);
						case 3:
							return $author$project$RightSlot$ShowClearButton;
						case 4:
							return $author$project$OptionList$isEmpty(selectedOptionList) ? $author$project$RightSlot$ShowDropdownIndicator(1) : $author$project$RightSlot$ShowClearButton;
						default:
							return $author$project$OptionList$isEmpty(selectedOptionList) ? $author$project$RightSlot$ShowDropdownIndicator(1) : $author$project$RightSlot$ShowClearButton;
					}
				} else {
					switch (current.$) {
						case 0:
							return $author$project$RightSlot$ShowNothing;
						case 1:
							return $author$project$RightSlot$ShowNothing;
						case 2:
							return $author$project$RightSlot$ShowNothing;
						case 3:
							return $author$project$RightSlot$ShowNothing;
						case 4:
							return $author$project$RightSlot$ShowAddButton;
						default:
							return $author$project$RightSlot$ShowAddAndRemoveButtons;
					}
				}
			} else {
				var _v4 = $author$project$SelectionMode$getOutputStyle(selectionConfig);
				if (!_v4) {
					switch (current.$) {
						case 0:
							return $author$project$RightSlot$ShowNothing;
						case 1:
							return $author$project$OptionList$isEmpty(selectedOptionList) ? $author$project$RightSlot$ShowDropdownIndicator(1) : $author$project$RightSlot$ShowClearButton;
						case 2:
							var focusTransition = current.a;
							return $author$project$RightSlot$ShowDropdownIndicator(focusTransition);
						case 3:
							return $author$project$RightSlot$ShowClearButton;
						case 4:
							return $author$project$OptionList$isEmpty(selectedOptionList) ? $author$project$RightSlot$ShowDropdownIndicator(1) : $author$project$RightSlot$ShowClearButton;
						default:
							return $author$project$OptionList$isEmpty(selectedOptionList) ? $author$project$RightSlot$ShowDropdownIndicator(1) : $author$project$RightSlot$ShowClearButton;
					}
				} else {
					var showRemoveButtons = $author$project$OptionList$length(selectedOptionList) > 1;
					var showAddButtons = A2(
						$author$project$OptionList$any,
						function (option) {
							return !$author$project$OptionValue$isEmpty(
								$author$project$Option$getOptionValue(option));
						},
						selectedOptionList);
					var addAndRemoveButtonState = (showAddButtons && (!showRemoveButtons)) ? $author$project$RightSlot$ShowAddButton : ((showAddButtons && showRemoveButtons) ? $author$project$RightSlot$ShowAddAndRemoveButtons : $author$project$RightSlot$ShowNothing);
					switch (current.$) {
						case 0:
							return addAndRemoveButtonState;
						case 1:
							return addAndRemoveButtonState;
						case 2:
							return addAndRemoveButtonState;
						case 3:
							return addAndRemoveButtonState;
						case 4:
							return addAndRemoveButtonState;
						default:
							return addAndRemoveButtonState;
					}
				}
			}
		}
	});
var $author$project$RightSlot$updateRightSlotTransitioning = F2(
	function (focusTransition, rightSlot) {
		if (rightSlot.$ === 2) {
			return $author$project$RightSlot$ShowDropdownIndicator(focusTransition);
		} else {
			return rightSlot;
		}
	});
var $author$project$OptionList$equal = F2(
	function (optionListA, optionListB) {
		return _Utils_eq(
			$author$project$OptionList$getOptions(optionListA),
			$author$project$OptionList$getOptions(optionListB));
	});
var $author$project$OptionList$updatedDatalistSelectedOptions = F2(
	function (selectedValues, optionList) {
		var optionsForTheDatasetHints = $author$project$OptionList$removeEmptyOptions(
			A2(
				$author$project$OptionList$uniqueBy,
				$author$project$Option$getOptionValueAsString,
				A2(
					$author$project$OptionList$map,
					$author$project$Option$deselect,
					A2(
						$author$project$OptionList$filter,
						A2($elm$core$Basics$composeR, $author$project$Option$isSelected, $elm$core$Basics$not),
						optionList))));
		var oldSelectedOptions = $author$project$OptionList$selectedOptions(optionList);
		var oldSelectedOptionsCleanedUp = $author$project$OptionList$cleanupEmptySelectedOptions(oldSelectedOptions);
		var newSelectedOptions = $author$project$OptionList$DatalistOptionList(
			A2(
				$elm$core$List$map,
				$author$project$Option$DatalistOption,
				A2(
					$elm$core$List$indexedMap,
					F2(
						function (i, selectedValue) {
							return A2($author$project$DatalistOption$newSelected, selectedValue, i);
						}),
					selectedValues)));
		var selectedOptions_ = A2($author$project$OptionList$equal, newSelectedOptions, oldSelectedOptionsCleanedUp) ? oldSelectedOptions : newSelectedOptions;
		return A2($author$project$OptionList$append, selectedOptions_, optionsForTheDatasetHints);
	});
var $author$project$MuchSelect$update = F2(
	function (msg, model) {
		switch (msg.$) {
			case 0:
				return _Utils_Tuple2(model, $author$project$MuchSelect$NoEffect);
			case 1:
				var _v1 = $author$project$SelectionMode$getOutputStyle(model.a);
				if (!_v1) {
					return $author$project$RightSlot$isRightSlotTransitioning(model.d) ? _Utils_Tuple2(model, $author$project$MuchSelect$NoEffect) : ($author$project$SelectionMode$isFocused(model.a) ? _Utils_Tuple2(model, $author$project$MuchSelect$FocusInput) : _Utils_Tuple2(
						_Utils_update(
							model,
							{
								d: A2($author$project$RightSlot$updateRightSlotTransitioning, 0, model.d),
								a: A2($author$project$SelectionMode$setIsFocused, true, model.a)
							}),
						$author$project$MuchSelect$FocusInput));
				} else {
					return _Utils_Tuple2(model, $author$project$MuchSelect$FocusInput);
				}
			case 2:
				return $author$project$RightSlot$isRightSlotTransitioning(model.d) ? _Utils_Tuple2(model, $author$project$MuchSelect$NoEffect) : ($author$project$SelectionMode$isFocused(model.a) ? _Utils_Tuple2(
					_Utils_update(
						model,
						{
							d: A2($author$project$RightSlot$updateRightSlotTransitioning, 0, model.d),
							a: A2($author$project$SelectionMode$setIsFocused, false, model.a)
						}),
					$author$project$MuchSelect$BlurInput) : _Utils_Tuple2(model, $author$project$MuchSelect$BlurInput));
			case 3:
				var _v2 = $author$project$SelectionMode$getOutputStyle(model.a);
				if (!_v2) {
					var optionsWithoutUnselectedCustomOptions = $author$project$OptionList$unhighlightSelectedOptions(
						$author$project$OptionList$removeUnselectedCustomOptions(model.b));
					return _Utils_Tuple2(
						$author$project$MuchSelect$updateModelWithChangesThatEffectTheOptionsWhenTheSearchStringChanges(
							_Utils_update(
								model,
								{
									b: optionsWithoutUnselectedCustomOptions,
									d: A2($author$project$RightSlot$updateRightSlotTransitioning, 1, model.d),
									g: $author$project$SearchString$reset,
									v: $grotsev$elm_debouncer$Bounce$push(model.v),
									a: A2(
										$author$project$SelectionMode$setIsFocused,
										false,
										A2($author$project$SelectionMode$setShowDropdown, false, model.a))
								})),
						$author$project$MuchSelect$batch(
							_List_fromArray(
								[
									$author$project$MuchSelect$InputHasBeenBlurred,
									$author$project$MuchSelect$SearchStringTouched(model.q)
								])));
				} else {
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								a: A2($author$project$SelectionMode$setIsFocused, false, model.a)
							}),
						$author$project$MuchSelect$InputHasBeenBlurred);
				}
			case 4:
				var _v3 = $author$project$SelectionMode$getOutputStyle(model.a);
				if (!_v3) {
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								d: A2($author$project$RightSlot$updateRightSlotTransitioning, 1, model.d),
								a: A2(
									$author$project$SelectionMode$setIsFocused,
									true,
									A2($author$project$SelectionMode$setShowDropdown, true, model.a))
							}),
						$author$project$MuchSelect$InputHasBeenFocused);
				} else {
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								a: A2($author$project$SelectionMode$setIsFocused, true, model.a)
							}),
						$author$project$MuchSelect$InputHasBeenFocused);
				}
			case 5:
				var optionValue = msg.a;
				var updatedOptions = A2($author$project$OptionList$changeHighlightedOptionByValue, optionValue, model.b);
				return _Utils_Tuple2(
					$author$project$MuchSelect$updateModelWithChangesThatEffectTheOptionsWhenTheMouseMoves(
						_Utils_update(
							model,
							{b: updatedOptions})),
					$author$project$MuchSelect$NoEffect);
			case 6:
				var optionValue = msg.a;
				var updatedOptions = A2($author$project$OptionList$unhighlightOptionByValue, optionValue, model.b);
				return _Utils_Tuple2(
					$author$project$MuchSelect$updateModelWithChangesThatEffectTheOptionsWhenTheMouseMoves(
						_Utils_update(
							model,
							{b: updatedOptions})),
					$author$project$MuchSelect$NoEffect);
			case 7:
				var optionValue = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							b: A2($author$project$OptionList$activateOptionInListByOptionValue, optionValue, model.b)
						}),
					$author$project$MuchSelect$NoEffect);
			case 8:
				var optionValue = msg.a;
				var _v4 = $author$project$SelectionMode$getSelectionMode(model.a);
				if (!_v4) {
					var updatedOptions = A2($author$project$OptionList$selectSingleOptionByValue, optionValue, model.b);
					var maybeNewlySelectedOption = A2($author$project$OptionList$findByValue, optionValue, updatedOptions);
					if (!maybeNewlySelectedOption.$) {
						var newlySelectedOption = maybeNewlySelectedOption.a;
						return _Utils_Tuple2(
							$author$project$MuchSelect$updateModelWithChangesThatEffectTheOptionsWhenTheSearchStringChanges(
								_Utils_update(
									model,
									{b: updatedOptions, g: $author$project$SearchString$reset})),
							$author$project$MuchSelect$batch(
								_List_fromArray(
									[
										A5(
										$author$project$MuchSelect$makeEffectsWhenSelectingAnOption,
										newlySelectedOption,
										$author$project$SelectionMode$getEventMode(model.a),
										$author$project$SelectionMode$getSelectionMode(model.a),
										model.h,
										$author$project$OptionList$selectedOptions(updatedOptions)),
										$author$project$MuchSelect$BlurInput
									])));
					} else {
						return _Utils_Tuple2(
							model,
							$author$project$MuchSelect$ReportErrorMessage('Unable to select option'));
					}
				} else {
					var updatedOptions = A2(
						$author$project$OptionList$selectOptionByOptionValue,
						optionValue,
						A2($author$project$DropdownOptions$moveHighlightedOptionDownIfThereAreOptions, model.a, model.b));
					var maybeNewlySelectedOption = A2($author$project$OptionList$findByValue, optionValue, updatedOptions);
					if (!maybeNewlySelectedOption.$) {
						var newlySelectedOption = maybeNewlySelectedOption.a;
						return _Utils_Tuple2(
							$author$project$MuchSelect$updateModelWithChangesThatEffectTheOptionsWhenTheSearchStringChanges(
								_Utils_update(
									model,
									{b: updatedOptions, g: $author$project$SearchString$reset})),
							$author$project$MuchSelect$batch(
								_List_fromArray(
									[
										A5(
										$author$project$MuchSelect$makeEffectsWhenSelectingAnOption,
										newlySelectedOption,
										$author$project$SelectionMode$getEventMode(model.a),
										$author$project$SelectionMode$getSelectionMode(model.a),
										model.h,
										$author$project$OptionList$selectedOptions(updatedOptions)),
										$author$project$MuchSelect$FocusInput,
										$author$project$MuchSelect$SearchStringTouched(model.q)
									])));
					} else {
						return _Utils_Tuple2(
							model,
							$author$project$MuchSelect$ReportErrorMessage('Unable to select option'));
					}
				}
			case 9:
				var searchString = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							g: $author$project$SearchString$update(searchString),
							v: $grotsev$elm_debouncer$Bounce$push(model.v),
							aq: model.aq + 1
						}),
					$author$project$MuchSelect$batch(
						_List_fromArray(
							[
								A2($author$project$MuchSelect$InputHasBeenKeyUp, searchString, 3),
								$author$project$MuchSelect$SearchStringTouched(model.q)
							])));
			case 10:
				return _Utils_Tuple2(
					$author$project$MuchSelect$updateModelWithChangesThatEffectTheOptionsWhenTheSearchStringChanges(model),
					$author$project$MuchSelect$SearchOptionsWithWebWorker(
						A4(
							$author$project$OptionSearcher$encodeSearchParams,
							model.g,
							$author$project$SelectionMode$getSearchStringMinimumLength(model.a),
							model.aq,
							$author$project$SearchString$isCleared(model.g))));
			case 11:
				var selectedValueIndex = msg.a;
				var valueString = msg.b;
				var _v7 = A3(
					$author$project$TransformAndValidate$transformAndValidateFirstPass,
					$author$project$SelectionMode$getTransformAndValidate(model.a),
					valueString,
					selectedValueIndex);
				switch (_v7.$) {
					case 0:
						var updatedOptions = A3(
							$author$project$OptionList$updateDatalistOptionsWithValue,
							$author$project$OptionValue$stringToOptionValue(valueString),
							selectedValueIndex,
							model.b);
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									b: updatedOptions,
									d: A4(
										$author$project$RightSlot$updateRightSlot,
										model.d,
										$author$project$SelectionMode$getOutputStyle(model.a),
										$author$project$SelectionMode$getSelectionMode(model.a),
										$author$project$OptionList$selectedOptions(updatedOptions))
								}),
							$author$project$MuchSelect$batch(
								_List_fromArray(
									[
										A4(
										$author$project$MuchSelect$makeEffectsWhenValuesChanges,
										$author$project$SelectionMode$getEventMode(model.a),
										$author$project$SelectionMode$getSelectionMode(model.a),
										model.h,
										$author$project$OptionList$cleanupEmptySelectedOptions(
											$author$project$OptionList$selectedOptions(updatedOptions))),
										A2($author$project$MuchSelect$InputHasBeenKeyUp, valueString, 0)
									])));
					case 1:
						var validationErrorMessages = _v7.c;
						var updatedOptions = A4(
							$author$project$OptionList$updateDatalistOptionsWithValueAndErrors,
							validationErrorMessages,
							$author$project$OptionValue$stringToOptionValue(valueString),
							selectedValueIndex,
							model.b);
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									b: updatedOptions,
									d: A4(
										$author$project$RightSlot$updateRightSlot,
										model.d,
										$author$project$SelectionMode$getOutputStyle(model.a),
										$author$project$SelectionMode$getSelectionMode(model.a),
										$author$project$OptionList$selectedOptions(updatedOptions))
								}),
							$author$project$MuchSelect$batch(
								_List_fromArray(
									[
										A4(
										$author$project$MuchSelect$makeEffectsWhenValuesChanges,
										$author$project$SelectionMode$getEventMode(model.a),
										$author$project$SelectionMode$getSelectionMode(model.a),
										model.h,
										$author$project$OptionList$cleanupEmptySelectedOptions(
											$author$project$OptionList$selectedOptions(updatedOptions))),
										A2($author$project$MuchSelect$InputHasBeenKeyUp, valueString, 2)
									])));
					default:
						var updatedOptions = A3(
							$author$project$OptionList$updateDatalistOptionsWithPendingValidation,
							$author$project$OptionValue$stringToOptionValue(valueString),
							selectedValueIndex,
							model.b);
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									b: updatedOptions,
									d: A4(
										$author$project$RightSlot$updateRightSlot,
										model.d,
										$author$project$SelectionMode$getOutputStyle(model.a),
										$author$project$SelectionMode$getSelectionMode(model.a),
										$author$project$OptionList$selectedOptions(updatedOptions))
								}),
							$author$project$MuchSelect$batch(
								_List_fromArray(
									[
										A4(
										$author$project$MuchSelect$makeEffectsWhenValuesChanges,
										$author$project$SelectionMode$getEventMode(model.a),
										$author$project$SelectionMode$getSelectionMode(model.a),
										model.h,
										$author$project$OptionList$cleanupEmptySelectedOptions(
											$author$project$OptionList$selectedOptions(updatedOptions))),
										A2($author$project$MuchSelect$InputHasBeenKeyUp, valueString, 1)
									])));
				}
			case 12:
				var inputString = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							b: A3(
								$author$project$OptionSearcher$updateOrAddCustomOption,
								$author$project$SearchString$update(inputString),
								model.a,
								model.b),
							g: $author$project$SearchString$update(inputString)
						}),
					A2($author$project$MuchSelect$InputHasBeenKeyUp, inputString, 3));
			case 13:
				var valuesJson = msg.a;
				var valuesResult = function () {
					var _v10 = $author$project$SelectionMode$getSelectionMode(model.a);
					if (!_v10) {
						return A2($elm$json$Json$Decode$decodeValue, $author$project$Ports$valueDecoder, valuesJson);
					} else {
						return A2($elm$json$Json$Decode$decodeValue, $author$project$Ports$valuesDecoder, valuesJson);
					}
				}();
				if (!valuesResult.$) {
					var values = valuesResult.a;
					var _v9 = $author$project$SelectionMode$getOutputStyle(model.a);
					if (!_v9) {
						var newOptions = A2($author$project$OptionList$selectOptionsInOptionsListByString, values, model.b);
						return _Utils_Tuple2(
							$author$project$MuchSelect$updateModelWithChangesThatEffectTheOptionsWhenTheSearchStringChanges(
								_Utils_update(
									model,
									{b: newOptions})),
							A4(
								$author$project$MuchSelect$makeEffectsWhenValuesChanges,
								$author$project$SelectionMode$getEventMode(model.a),
								$author$project$SelectionMode$getSelectionMode(model.a),
								model.h,
								$author$project$OptionList$selectedOptions(newOptions)));
					} else {
						var newOptions = A2(
							$author$project$OptionList$updatedDatalistSelectedOptions,
							A2($elm$core$List$map, $author$project$OptionValue$stringToOptionValue, values),
							model.b);
						return _Utils_Tuple2(
							$author$project$MuchSelect$updateModelWithChangesThatEffectTheOptionsWhenTheSearchStringChanges(
								_Utils_update(
									model,
									{b: newOptions})),
							A4(
								$author$project$MuchSelect$makeEffectsWhenValuesChanges,
								$author$project$SelectionMode$getEventMode(model.a),
								$author$project$SelectionMode$getSelectionMode(model.a),
								model.h,
								$author$project$OptionList$selectedOptions(newOptions)));
					}
				} else {
					var error = valuesResult.a;
					return _Utils_Tuple2(
						model,
						$author$project$MuchSelect$ReportErrorMessage(
							$elm$json$Json$Decode$errorToString(error)));
				}
			case 14:
				var newOptionsJson = msg.a;
				var decoder = A2(
					$author$project$OptionList$decoderWithAge,
					0,
					$author$project$SelectionMode$getOutputStyle(model.a));
				var _v11 = A2($elm$json$Json$Decode$decodeValue, decoder, newOptionsJson);
				if (!_v11.$) {
					var newOptions_ = _v11.a;
					var _v12 = $author$project$SelectionMode$getOutputStyle(model.a);
					if (!_v12) {
						var newOptionWithOldSelectedOption = A3($author$project$OptionList$replaceOptions, model.a, model.b, newOptions_);
						return _Utils_Tuple2(
							$author$project$MuchSelect$updateModelWithChangesThatEffectTheOptionsWhenTheSearchStringChanges(
								_Utils_update(
									model,
									{
										b: A4(
											$author$project$OptionList$updateAge,
											0,
											model.g,
											$author$project$SelectionMode$getSearchStringMinimumLength(model.a),
											newOptionWithOldSelectedOption),
										d: A4(
											$author$project$RightSlot$updateRightSlot,
											model.d,
											$author$project$SelectionMode$getOutputStyle(model.a),
											$author$project$SelectionMode$getSelectionMode(model.a),
											$author$project$OptionList$selectedOptions(newOptionWithOldSelectedOption)),
										v: $grotsev$elm_debouncer$Bounce$push(model.v)
									})),
							$author$project$MuchSelect$batch(
								_List_fromArray(
									[
										$author$project$MuchSelect$OptionsUpdated(true),
										A2($author$project$MuchSelect$makeEffectsForUpdatingOptionsInTheWebWorker, model.q, model.g)
									])));
					} else {
						var newOptionWithOldSelectedOption = A4(
							$author$project$OptionList$updateAge,
							1,
							model.g,
							$author$project$SelectionMode$getSearchStringMinimumLength(model.a),
							$author$project$OptionList$organizeNewDatalistOptions(
								A3($author$project$OptionList$replaceOptions, model.a, model.b, newOptions_)));
						return _Utils_Tuple2(
							$author$project$MuchSelect$updateModelWithChangesThatEffectTheOptionsWhenTheSearchStringChanges(
								_Utils_update(
									model,
									{
										b: newOptionWithOldSelectedOption,
										d: A4(
											$author$project$RightSlot$updateRightSlot,
											model.d,
											$author$project$SelectionMode$getOutputStyle(model.a),
											$author$project$SelectionMode$getSelectionMode(model.a),
											$author$project$OptionList$selectedOptions(newOptionWithOldSelectedOption)),
										v: $grotsev$elm_debouncer$Bounce$push(model.v)
									})),
							$author$project$MuchSelect$batch(
								_List_fromArray(
									[
										$author$project$MuchSelect$OptionsUpdated(true),
										A2($author$project$MuchSelect$makeEffectsForUpdatingOptionsInTheWebWorker, model.q, model.g)
									])));
					}
				} else {
					var error = _v11.a;
					return _Utils_Tuple2(
						model,
						$author$project$MuchSelect$ReportErrorMessage(
							$elm$json$Json$Decode$errorToString(error)));
				}
			case 16:
				var optionsJson = msg.a;
				var _v13 = A2(
					$elm$json$Json$Decode$decodeValue,
					A2(
						$author$project$OptionList$decoderWithAge,
						0,
						$author$project$SelectionMode$getOutputStyle(model.a)),
					optionsJson);
				if (!_v13.$) {
					var newOptions = _v13.a;
					var updatedOptions = A4(
						$author$project$OptionList$updateAge,
						$author$project$SelectionMode$getOutputStyle(model.a),
						model.g,
						$author$project$SelectionMode$getSearchStringMinimumLength(model.a),
						A2($author$project$OptionList$addAdditionalOptionsToOptionList, model.b, newOptions));
					return _Utils_Tuple2(
						$author$project$MuchSelect$updateModelWithChangesThatEffectTheOptionsWhenTheSearchStringChanges(
							_Utils_update(
								model,
								{
									b: updatedOptions,
									v: $grotsev$elm_debouncer$Bounce$push(model.v),
									q: $author$project$MuchSelect$getDebouceDelayForSearch(
										$author$project$OptionList$length(updatedOptions))
								})),
						$author$project$MuchSelect$batch(
							_List_fromArray(
								[
									$author$project$MuchSelect$OptionsUpdated(false),
									A2($author$project$MuchSelect$makeEffectsForUpdatingOptionsInTheWebWorker, model.q, model.g)
								])));
				} else {
					var error = _v13.a;
					return _Utils_Tuple2(
						model,
						$author$project$MuchSelect$ReportErrorMessage(
							$elm$json$Json$Decode$errorToString(error)));
				}
			case 17:
				var optionsJson = msg.a;
				var _v14 = A2(
					$elm$json$Json$Decode$decodeValue,
					A2(
						$author$project$OptionList$decoderWithAge,
						1,
						$author$project$SelectionMode$getOutputStyle(model.a)),
					optionsJson);
				if (!_v14.$) {
					var optionsToRemove = _v14.a;
					var updatedOptions = A2($author$project$OptionList$removeOptionsFromOptionList, model.b, optionsToRemove);
					return _Utils_Tuple2(
						$author$project$MuchSelect$updateModelWithChangesThatEffectTheOptionsWhenTheSearchStringChanges(
							_Utils_update(
								model,
								{
									b: updatedOptions,
									v: $grotsev$elm_debouncer$Bounce$push(model.v),
									q: $author$project$MuchSelect$getDebouceDelayForSearch(
										$author$project$OptionList$length(updatedOptions))
								})),
						$author$project$MuchSelect$batch(
							_List_fromArray(
								[
									$author$project$MuchSelect$OptionsUpdated(true),
									A2($author$project$MuchSelect$makeEffectsForUpdatingOptionsInTheWebWorker, model.q, model.g)
								])));
				} else {
					var error = _v14.a;
					return _Utils_Tuple2(
						model,
						$author$project$MuchSelect$ReportErrorMessage(
							$elm$json$Json$Decode$errorToString(error)));
				}
			case 18:
				var optionJson = msg.a;
				var _v15 = A2(
					$elm$json$Json$Decode$decodeValue,
					A2(
						$author$project$Option$decoderWithAgeAndOutputStyle,
						1,
						$author$project$SelectionMode$getOutputStyle(model.a)),
					optionJson);
				if (!_v15.$) {
					var option = _v15.a;
					var updatedOptions = function () {
						var _v16 = $author$project$SelectionMode$getSelectionMode(model.a);
						if (_v16 === 1) {
							return A2($author$project$OptionList$selectOption, option, model.b);
						} else {
							return A2($author$project$OptionList$selectSingleOption, option, model.b);
						}
					}();
					return _Utils_Tuple2(
						$author$project$MuchSelect$updateModelWithChangesThatEffectTheOptionsWhenTheSearchStringChanges(
							_Utils_update(
								model,
								{
									b: updatedOptions,
									v: $grotsev$elm_debouncer$Bounce$push(model.v)
								})),
						$author$project$MuchSelect$batch(
							_List_fromArray(
								[
									A5(
									$author$project$MuchSelect$makeEffectsWhenSelectingAnOption,
									option,
									$author$project$SelectionMode$getEventMode(model.a),
									$author$project$SelectionMode$getSelectionMode(model.a),
									model.h,
									$author$project$OptionList$selectedOptions(updatedOptions)),
									A2($author$project$MuchSelect$makeEffectsForUpdatingOptionsInTheWebWorker, model.q, model.g),
									$author$project$MuchSelect$SearchStringTouched(model.q)
								])));
				} else {
					var error = _v15.a;
					return _Utils_Tuple2(
						model,
						$author$project$MuchSelect$ReportErrorMessage(
							$elm$json$Json$Decode$errorToString(error)));
				}
			case 20:
				var optionValueToDeselect = msg.a;
				return A2($author$project$MuchSelect$deselectOption, model, optionValueToDeselect);
			case 19:
				var optionJson = msg.a;
				var _v17 = A2($elm$json$Json$Decode$decodeValue, $author$project$Option$decoder, optionJson);
				if (!_v17.$) {
					var option = _v17.a;
					return A2(
						$author$project$MuchSelect$deselectOption,
						model,
						$author$project$Option$getOptionValue(option));
				} else {
					var error = _v17.a;
					return _Utils_Tuple2(
						model,
						$author$project$MuchSelect$ReportErrorMessage(
							$elm$json$Json$Decode$errorToString(error)));
				}
			case 50:
				var selectedValueEncodingString = msg.a;
				var _v18 = $author$project$SelectedValueEncoding$fromString(selectedValueEncodingString);
				if (!_v18.$) {
					var selectedValueEncoding = _v18.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{h: selectedValueEncoding}),
						$author$project$MuchSelect$NoEffect);
				} else {
					var error = _v18.a;
					return _Utils_Tuple2(
						model,
						$author$project$MuchSelect$ReportErrorMessage(error));
				}
			case 15:
				var sortingString = msg.a;
				var _v19 = $author$project$OptionSorting$stringToOptionSort(sortingString);
				if (!_v19.$) {
					var optionSorting = _v19.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{M: optionSorting}),
						$author$project$MuchSelect$NoEffect);
				} else {
					var error = _v19.a;
					return _Utils_Tuple2(
						model,
						$author$project$MuchSelect$ReportErrorMessage(error));
				}
			case 21:
				var newPlaceholder = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							a: A2($author$project$SelectionMode$setPlaceholder, newPlaceholder, model.a)
						}),
					$author$project$MuchSelect$NoEffect);
			case 22:
				var bool = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							d: A4(
								$author$project$RightSlot$updateRightSlotLoading,
								model.d,
								model.a,
								$author$project$OptionList$selectedOptions(model.b),
								bool)
						}),
					$author$project$MuchSelect$NoEffect);
			case 23:
				var stringValue = msg.a;
				var _v20 = $author$project$OutputStyle$stringToMaxDropdownItems(stringValue);
				if (!_v20.$) {
					var maxDropdownItems = _v20.a;
					return _Utils_Tuple2(
						$author$project$MuchSelect$updateModelWithChangesThatEffectTheOptionsWhenTheSearchStringChanges(
							_Utils_update(
								model,
								{
									a: A2($author$project$SelectionMode$setMaxDropdownItems, maxDropdownItems, model.a)
								})),
						$author$project$MuchSelect$NoEffect);
				} else {
					var error = _v20.a;
					return _Utils_Tuple2(
						model,
						$author$project$MuchSelect$ReportErrorMessage(error));
				}
			case 24:
				var bool = msg.a;
				var newDropdownStyle = bool ? 1 : 0;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							a: A2($author$project$SelectionMode$setDropdownStyle, newDropdownStyle, model.a)
						}),
					$author$project$MuchSelect$NoEffect);
			case 25:
				var _v21 = msg.a;
				var canAddCustomOptions = _v21.a;
				var customOptionHint = _v21.b;
				var maybeCustomOptionHint = function () {
					switch (customOptionHint) {
						case '':
							return $elm$core$Maybe$Nothing;
						case 'true':
							return $elm$core$Maybe$Nothing;
						case 'false':
							return $elm$core$Maybe$Nothing;
						default:
							return $elm$core$Maybe$Just(customOptionHint);
					}
				}();
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							a: A3($author$project$SelectionMode$setAllowCustomOptionsWithBool, canAddCustomOptions, maybeCustomOptionHint, model.a)
						}),
					$author$project$MuchSelect$NoEffect);
			case 26:
				var bool = msg.a;
				var newSelectionConfig = A2($author$project$SelectionMode$setIsDisabled, bool, model.a);
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							d: A4(
								$author$project$RightSlot$updateRightSlot,
								model.d,
								$author$project$SelectionMode$getOutputStyle(newSelectionConfig),
								$author$project$SelectionMode$getSelectionMode(newSelectionConfig),
								$author$project$OptionList$selectedOptions(model.b)),
							a: newSelectionConfig
						}),
					$author$project$MuchSelect$NoEffect);
			case 30:
				var selectedItemStaysInPlace = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							a: A2($author$project$SelectionMode$setSelectedItemStaysInPlaceWithBool, selectedItemStaysInPlace, model.a)
						}),
					$author$project$MuchSelect$NoEffect);
			case 31:
				var newOutputStyleString = msg.a;
				var _v23 = $author$project$SelectionMode$stringToOutputStyle(newOutputStyleString);
				if (!_v23.$) {
					var outputStyle = _v23.a;
					var newSelectionConfig = A3($author$project$SelectionMode$setOutputStyle, model.m, outputStyle, model.a);
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								d: A4(
									$author$project$RightSlot$updateRightSlot,
									model.d,
									$author$project$SelectionMode$getOutputStyle(newSelectionConfig),
									$author$project$SelectionMode$getSelectionMode(newSelectionConfig),
									$author$project$OptionList$selectedOptions(model.b)),
								a: newSelectionConfig
							}),
						$author$project$MuchSelect$Batch(
							_List_fromArray(
								[
									$author$project$MuchSelect$FetchOptionsFromDom,
									$author$project$MuchSelect$ChangeTheLightDom(
									A2($author$project$LightDomChange$AddUpdateAttribute, 'output-style', newOutputStyleString))
								])));
				} else {
					return _Utils_Tuple2(
						model,
						$author$project$MuchSelect$ReportErrorMessage('Invalid output style ' + newOutputStyleString));
				}
			case 28:
				var shouldEnableMultiSelectSingleItemRemoval = msg.a;
				var multiSelectSingleItemRemoval = shouldEnableMultiSelectSingleItemRemoval ? 0 : 1;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							a: A2($author$project$SelectionMode$setSingleItemRemoval, multiSelectSingleItemRemoval, model.a)
						}),
					$author$project$MuchSelect$batch(
						_List_fromArray(
							[$author$project$MuchSelect$ReportReady, $author$project$MuchSelect$NoEffect])));
			case 27:
				var isInMultiSelectMode = msg.a;
				var updatedOptions = isInMultiSelectMode ? model.b : $author$project$OptionList$deselectAllButTheFirstSelectedOptionInList(model.b);
				var cmd = isInMultiSelectMode ? $author$project$MuchSelect$NoEffect : A4(
					$author$project$MuchSelect$makeEffectsWhenValuesChanges,
					$author$project$SelectionMode$getEventMode(model.a),
					$author$project$SelectionMode$getSelectionMode(model.a),
					model.h,
					$author$project$OptionList$selectedOptions(updatedOptions));
				return _Utils_Tuple2(
					$author$project$MuchSelect$updateModelWithChangesThatEffectTheOptionsWhenTheSearchStringChanges(
						_Utils_update(
							model,
							{
								b: updatedOptions,
								a: A2($author$project$SelectionMode$setMultiSelectModeWithBool, isInMultiSelectMode, model.a)
							})),
					$author$project$MuchSelect$batch(
						_List_fromArray(
							[
								$author$project$MuchSelect$ReportReady,
								A2($author$project$MuchSelect$makeEffectsForUpdatingOptionsInTheWebWorker, model.q, model.g),
								cmd
							])));
			case 29:
				var searchStringMinimumLength = msg.a;
				return _Utils_Tuple2(
					$author$project$MuchSelect$updateModelWithChangesThatEffectTheOptionsWhenTheSearchStringChanges(
						_Utils_update(
							model,
							{
								a: A2(
									$author$project$SelectionMode$setSearchStringMinimumLength,
									$author$project$OutputStyle$FixedSearchStringMinimumLength(
										$author$project$PositiveInt$new(searchStringMinimumLength)),
									model.a)
							})),
					$author$project$MuchSelect$NoEffect);
			case 32:
				var updatedOptions = A2(
					$author$project$OptionList$selectHighlightedOption,
					$author$project$SelectionMode$getSelectionMode(model.a),
					model.b);
				var maybeHighlightedOption = $author$project$OptionList$findHighlightedOption(model.b);
				var maybeNewlySelectedOption = A2(
					$elm$core$Maybe$andThen,
					function (highlightedOption) {
						return A2(
							$author$project$OptionList$findByValue,
							$author$project$Option$getOptionValue(highlightedOption),
							updatedOptions);
					},
					maybeHighlightedOption);
				if (!maybeNewlySelectedOption.$) {
					var newlySelectedOption = maybeNewlySelectedOption.a;
					var _v25 = $author$project$SelectionMode$getSelectionMode(model.a);
					if (!_v25) {
						return _Utils_Tuple2(
							$author$project$MuchSelect$updateModelWithChangesThatEffectTheOptionsWhenTheSearchStringChanges(
								_Utils_update(
									model,
									{b: updatedOptions, g: $author$project$SearchString$reset})),
							$author$project$MuchSelect$batch(
								_List_fromArray(
									[
										A5(
										$author$project$MuchSelect$makeEffectsWhenSelectingAnOption,
										newlySelectedOption,
										$author$project$SelectionMode$getEventMode(model.a),
										$author$project$SelectionMode$getSelectionMode(model.a),
										model.h,
										$author$project$OptionList$selectedOptions(updatedOptions)),
										A2($author$project$MuchSelect$makeEffectsForUpdatingOptionsInTheWebWorker, model.q, model.g),
										$author$project$MuchSelect$BlurInput
									])));
					} else {
						return _Utils_Tuple2(
							$author$project$MuchSelect$updateModelWithChangesThatEffectTheOptionsWhenTheSearchStringChanges(
								_Utils_update(
									model,
									{b: updatedOptions, g: $author$project$SearchString$reset})),
							$author$project$MuchSelect$batch(
								_List_fromArray(
									[
										A5(
										$author$project$MuchSelect$makeEffectsWhenSelectingAnOption,
										newlySelectedOption,
										$author$project$SelectionMode$getEventMode(model.a),
										$author$project$SelectionMode$getSelectionMode(model.a),
										model.h,
										$author$project$OptionList$selectedOptions(updatedOptions)),
										A2($author$project$MuchSelect$makeEffectsForUpdatingOptionsInTheWebWorker, model.q, model.g),
										$author$project$MuchSelect$FocusInput
									])));
					}
				} else {
					return _Utils_Tuple2(
						model,
						$author$project$MuchSelect$ReportErrorMessage('Unable select highlighted option'));
				}
			case 33:
				var _v26 = model.a;
				if (!_v26.$) {
					return $author$project$OptionList$hasSelectedOption(model.b) ? $author$project$MuchSelect$clearAllSelectedOptions(model) : _Utils_Tuple2(model, $author$project$MuchSelect$NoEffect);
				} else {
					return _Utils_Tuple2(model, $author$project$MuchSelect$NoEffect);
				}
			case 34:
				return _Utils_Tuple2(
					$author$project$MuchSelect$updateModelWithChangesThatEffectTheOptionsWhenTheSearchStringChanges(
						_Utils_update(
							model,
							{g: $author$project$SearchString$reset})),
					$author$project$MuchSelect$BlurInput);
			case 35:
				var updatedOptions = A2($author$project$DropdownOptions$moveHighlightedOptionUp, model.a, model.b);
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{b: updatedOptions}),
					$author$project$MuchSelect$ScrollDownToElement('something'));
			case 36:
				var updatedOptions = A2($author$project$DropdownOptions$moveHighlightedOptionDown, model.a, model.b);
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{b: updatedOptions}),
					$author$project$MuchSelect$ScrollDownToElement('something'));
			case 37:
				var dims = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							aL: A2($author$project$MuchSelect$ValueCasing, dims.ek, dims.df)
						}),
					$author$project$MuchSelect$NoEffect);
			case 38:
				return $author$project$MuchSelect$clearAllSelectedOptions(model);
			case 39:
				var optionValue = msg.a;
				var updatedOptions = A2($author$project$OptionList$toggleSelectedHighlightByOptionValue, optionValue, model.b);
				return _Utils_Tuple2(
					$author$project$MuchSelect$updateModelWithChangesThatEffectTheOptionsWhenTheSearchStringChanges(
						_Utils_update(
							model,
							{b: updatedOptions})),
					$author$project$MuchSelect$NoEffect);
			case 40:
				if ($author$project$SearchString$length(model.g) > 0) {
					return _Utils_Tuple2(model, $author$project$MuchSelect$NoEffect);
				} else {
					var updatedOptions = $author$project$OptionList$hasSelectedHighlightedOptions(model.b) ? $author$project$OptionList$deselectAllSelectedHighlightedOptions(model.b) : $author$project$OptionList$deselectLastSelectedOption(model.b);
					return _Utils_Tuple2(
						$author$project$MuchSelect$updateModelWithChangesThatEffectTheOptionsWhenTheSearchStringChanges(
							_Utils_update(
								model,
								{b: updatedOptions})),
						$author$project$MuchSelect$batch(
							_List_fromArray(
								[
									A2(
									$author$project$MuchSelect$ReportValueChanged,
									$author$project$Ports$optionsEncoder(
										$author$project$OptionList$selectedOptions(updatedOptions)),
									$author$project$SelectionMode$getSelectionMode(model.a)),
									$author$project$MuchSelect$FocusInput
								])));
				}
			case 41:
				var indexWhereToAdd = msg.a;
				var updatedOptions = A2($author$project$OptionList$addNewSelectedEmptyOptionAtIndex, indexWhereToAdd + 1, model.b);
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							bg: indexWhereToAdd + 1,
							b: updatedOptions,
							d: A4(
								$author$project$RightSlot$updateRightSlot,
								model.d,
								$author$project$SelectionMode$getOutputStyle(model.a),
								$author$project$SelectionMode$getSelectionMode(model.a),
								$author$project$OptionList$selectedOptions(updatedOptions))
						}),
					A4(
						$author$project$MuchSelect$makeEffectsWhenValuesChanges,
						$author$project$SelectionMode$getEventMode(model.a),
						$author$project$SelectionMode$getSelectionMode(model.a),
						model.h,
						$author$project$OptionList$cleanupEmptySelectedOptions(
							$author$project$OptionList$selectedOptions(updatedOptions))));
			case 42:
				var indexWhereToDelete = msg.a;
				var _v27 = $author$project$PositiveInt$maybeNew(indexWhereToDelete);
				if (!_v27.$) {
					var selectedIndex = _v27.a;
					var updatedOptions = A2($author$project$OptionList$deselect, selectedIndex, model.b);
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								b: updatedOptions,
								d: A4(
									$author$project$RightSlot$updateRightSlot,
									model.d,
									$author$project$SelectionMode$getOutputStyle(model.a),
									$author$project$SelectionMode$getSelectionMode(model.a),
									$author$project$OptionList$selectedOptions(updatedOptions))
							}),
						A4(
							$author$project$MuchSelect$makeEffectsWhenValuesChanges,
							$author$project$SelectionMode$getEventMode(model.a),
							$author$project$SelectionMode$getSelectionMode(model.a),
							model.h,
							$author$project$OptionList$cleanupEmptySelectedOptions(
								$author$project$OptionList$selectedOptions(updatedOptions))));
				} else {
					return _Utils_Tuple2(model, $author$project$MuchSelect$NoEffect);
				}
			case 43:
				return _Utils_Tuple2(
					model,
					$author$project$MuchSelect$ReportAllOptions(
						$author$project$OptionList$encode(model.b)));
			case 44:
				var updatedSearchResultsJsonValue = msg.a;
				var _v28 = A2($elm$json$Json$Decode$decodeValue, $author$project$Option$decodeSearchResults, updatedSearchResultsJsonValue);
				if (!_v28.$) {
					var searchResults = _v28.a;
					if (_Utils_eq(searchResults.d2, model.aq)) {
						var updatedOptions = A2(
							$author$project$OptionList$setAge,
							1,
							A2($author$project$OptionList$updateOptionsWithNewSearchResults, searchResults.dT, model.b));
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									b: function () {
										if (searchResults.dm) {
											return updatedOptions;
										} else {
											var options = A2($author$project$DropdownOptions$figureOutWhichOptionsToShowInTheDropdownThatAreNotSelected, model.a, updatedOptions);
											var _v29 = $author$project$DropdownOptions$head(options);
											if (!_v29.$) {
												var firstOption = _v29.a;
												return A2($author$project$OptionList$changeHighlightedOption, firstOption, updatedOptions);
											} else {
												return updatedOptions;
											}
										}
									}()
								}),
							$author$project$MuchSelect$NoEffect);
					} else {
						return _Utils_Tuple2(model, $author$project$MuchSelect$NoEffect);
					}
				} else {
					var error = _v28.a;
					return _Utils_Tuple2(
						model,
						$author$project$MuchSelect$ReportErrorMessage(
							$elm$json$Json$Decode$errorToString(error)));
				}
			case 45:
				var customValidationResultJson = msg.a;
				var _v30 = A2($elm$json$Json$Decode$decodeValue, $author$project$TransformAndValidate$customValidationResultDecoder, customValidationResultJson);
				if (!_v30.$) {
					var customValidationResult = _v30.a;
					var _v31 = A2(
						$author$project$TransformAndValidate$transformAndValidateSecondPass,
						$author$project$SelectionMode$getTransformAndValidate(model.a),
						customValidationResult);
					switch (_v31.$) {
						case 0:
							var valueString = _v31.a;
							var selectedValueIndex = _v31.b;
							var updatedOptions = A3(
								$author$project$OptionList$updateDatalistOptionsWithValue,
								$author$project$OptionValue$stringToOptionValue(valueString),
								selectedValueIndex,
								model.b);
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										b: updatedOptions,
										d: A4(
											$author$project$RightSlot$updateRightSlot,
											model.d,
											$author$project$SelectionMode$getOutputStyle(model.a),
											$author$project$SelectionMode$getSelectionMode(model.a),
											$author$project$OptionList$selectedOptions(updatedOptions))
									}),
								A4(
									$author$project$MuchSelect$makeEffectsWhenValuesChanges,
									$author$project$SelectionMode$getEventMode(model.a),
									$author$project$SelectionMode$getSelectionMode(model.a),
									model.h,
									$author$project$OptionList$cleanupEmptySelectedOptions(
										$author$project$OptionList$selectedOptions(updatedOptions))));
						case 1:
							var valueString = _v31.a;
							var selectedValueIndex = _v31.b;
							var validationFailureMessages = _v31.c;
							var updatedOptions = A4(
								$author$project$OptionList$updateDatalistOptionsWithValueAndErrors,
								validationFailureMessages,
								$author$project$OptionValue$stringToOptionValue(valueString),
								selectedValueIndex,
								model.b);
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										b: updatedOptions,
										d: A4(
											$author$project$RightSlot$updateRightSlot,
											model.d,
											$author$project$SelectionMode$getOutputStyle(model.a),
											$author$project$SelectionMode$getSelectionMode(model.a),
											$author$project$OptionList$selectedOptions(updatedOptions))
									}),
								A4(
									$author$project$MuchSelect$makeEffectsWhenValuesChanges,
									$author$project$SelectionMode$getEventMode(model.a),
									$author$project$SelectionMode$getSelectionMode(model.a),
									model.h,
									$author$project$OptionList$cleanupEmptySelectedOptions(
										$author$project$OptionList$selectedOptions(updatedOptions))));
						default:
							return _Utils_Tuple2(
								model,
								$author$project$MuchSelect$ReportErrorMessage('We should not end up with a validation pending state on a second pass.'));
					}
				} else {
					var error = _v30.a;
					return _Utils_Tuple2(
						model,
						$author$project$MuchSelect$ReportErrorMessage(
							$elm$json$Json$Decode$errorToString(error)));
				}
			case 46:
				var transformationAndValidationJson = msg.a;
				var _v32 = A2($elm$json$Json$Decode$decodeValue, $author$project$TransformAndValidate$decoder, transformationAndValidationJson);
				if (!_v32.$) {
					var newTransformationAndValidation = _v32.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								a: A2($author$project$SelectionMode$setTransformAndValidate, newTransformationAndValidation, model.a)
							}),
						$author$project$MuchSelect$NoEffect);
				} else {
					var error = _v32.a;
					return _Utils_Tuple2(
						model,
						$author$project$MuchSelect$ReportErrorMessage(
							$elm$json$Json$Decode$errorToString(error)));
				}
			case 47:
				var _v33 = msg.a;
				var attributeName = _v33.a;
				var newAttributeValue = _v33.b;
				switch (attributeName) {
					case 'allow-custom-options':
						switch (newAttributeValue) {
							case '':
								return _Utils_Tuple2(
									_Utils_update(
										model,
										{
											m: A2($author$project$DomStateCache$updateAllowCustomOptions, $author$project$DomStateCache$CustomOptionsAllowed, model.m),
											a: A3($author$project$SelectionMode$setAllowCustomOptionsWithBool, true, $elm$core$Maybe$Nothing, model.a)
										}),
									$author$project$MuchSelect$NoEffect);
							case 'false':
								return _Utils_Tuple2(
									_Utils_update(
										model,
										{
											m: A2($author$project$DomStateCache$updateAllowCustomOptions, $author$project$DomStateCache$CustomOptionsNotAllowed, model.m),
											a: A3($author$project$SelectionMode$setAllowCustomOptionsWithBool, false, $elm$core$Maybe$Nothing, model.a)
										}),
									$author$project$MuchSelect$NoEffect);
							case 'true':
								return _Utils_Tuple2(
									_Utils_update(
										model,
										{
											m: A2($author$project$DomStateCache$updateAllowCustomOptions, $author$project$DomStateCache$CustomOptionsAllowed, model.m),
											a: A3($author$project$SelectionMode$setAllowCustomOptionsWithBool, true, $elm$core$Maybe$Nothing, model.a)
										}),
									$author$project$MuchSelect$NoEffect);
							default:
								var customOptionHint = newAttributeValue;
								return _Utils_Tuple2(
									_Utils_update(
										model,
										{
											m: A2(
												$author$project$DomStateCache$updateAllowCustomOptions,
												$author$project$DomStateCache$CustomOptionsAllowedWithHint(customOptionHint),
												model.m),
											a: A3(
												$author$project$SelectionMode$setAllowCustomOptionsWithBool,
												true,
												$elm$core$Maybe$Just(customOptionHint),
												model.a)
										}),
									$author$project$MuchSelect$NoEffect);
						}
					case 'disabled':
						var newSelectionConfig = A2($author$project$SelectionMode$setIsDisabled, true, model.a);
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									m: A2($author$project$DomStateCache$updateDisabledAttribute, 0, model.m),
									d: A4(
										$author$project$RightSlot$updateRightSlot,
										model.d,
										$author$project$SelectionMode$getOutputStyle(newSelectionConfig),
										$author$project$SelectionMode$getSelectionMode(newSelectionConfig),
										$author$project$OptionList$selectedOptions(model.b)),
									a: newSelectionConfig
								}),
							$author$project$MuchSelect$NoEffect);
					case 'events-only':
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									a: A2($author$project$SelectionMode$setEventsOnly, true, model.a)
								}),
							$author$project$MuchSelect$NoEffect);
					case 'loading':
						if (newAttributeValue === 'false') {
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										d: A4(
											$author$project$RightSlot$updateRightSlotLoading,
											model.d,
											model.a,
											$author$project$OptionList$selectedOptions(model.b),
											false)
									}),
								$author$project$MuchSelect$NoEffect);
						} else {
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										d: A4(
											$author$project$RightSlot$updateRightSlotLoading,
											model.d,
											model.a,
											$author$project$OptionList$selectedOptions(model.b),
											true)
									}),
								$author$project$MuchSelect$NoEffect);
						}
					case 'max-dropdown-items':
						var _v37 = $author$project$OutputStyle$stringToMaxDropdownItems(newAttributeValue);
						if (!_v37.$) {
							var maxDropdownItems = _v37.a;
							return _Utils_Tuple2(
								$author$project$MuchSelect$updateModelWithChangesThatEffectTheOptionsWhenTheSearchStringChanges(
									_Utils_update(
										model,
										{
											a: A2($author$project$SelectionMode$setMaxDropdownItems, maxDropdownItems, model.a)
										})),
								$author$project$MuchSelect$NoEffect);
						} else {
							var err = _v37.a;
							return _Utils_Tuple2(
								model,
								$author$project$MuchSelect$ReportErrorMessage(err));
						}
					case 'multi-select':
						return _Utils_Tuple2(
							$author$project$MuchSelect$updateModelWithChangesThatEffectTheOptionsWhenTheSearchStringChanges(
								_Utils_update(
									model,
									{
										a: A2($author$project$SelectionMode$setMultiSelectModeWithBool, true, model.a)
									})),
							$author$project$MuchSelect$batch(
								_List_fromArray(
									[
										$author$project$MuchSelect$ReportReady,
										A2($author$project$MuchSelect$makeEffectsForUpdatingOptionsInTheWebWorker, model.q, model.g)
									])));
					case 'multi-select-single-item-removal':
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									a: A2($author$project$SelectionMode$setSingleItemRemoval, 0, model.a)
								}),
							$author$project$MuchSelect$ReportReady);
					case 'option-sorting':
						var _v38 = $author$project$OptionSorting$stringToOptionSort(newAttributeValue);
						if (!_v38.$) {
							var optionSorting = _v38.a;
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{M: optionSorting}),
								$author$project$MuchSelect$NoEffect);
						} else {
							var error = _v38.a;
							return _Utils_Tuple2(
								model,
								$author$project$MuchSelect$ReportErrorMessage(error));
						}
					case 'output-style':
						var _v39 = $author$project$SelectionMode$stringToOutputStyle(newAttributeValue);
						if (!_v39.$) {
							var outputStyle = _v39.a;
							var newSelectionConfig = A3($author$project$SelectionMode$setOutputStyle, model.m, outputStyle, model.a);
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										m: A2(
											$author$project$DomStateCache$updateOutputStyle,
											function () {
												if (outputStyle === 1) {
													return 0;
												} else {
													return 1;
												}
											}(),
											model.m),
										d: A4(
											$author$project$RightSlot$updateRightSlot,
											model.d,
											$author$project$SelectionMode$getOutputStyle(newSelectionConfig),
											$author$project$SelectionMode$getSelectionMode(newSelectionConfig),
											model.b),
										a: newSelectionConfig
									}),
								$author$project$MuchSelect$FetchOptionsFromDom);
						} else {
							return _Utils_Tuple2(
								model,
								$author$project$MuchSelect$ReportErrorMessage('Invalid output style: ' + newAttributeValue));
						}
					case 'placeholder':
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									a: A2(
										$author$project$SelectionMode$setPlaceholder,
										_Utils_Tuple2(true, newAttributeValue),
										model.a)
								}),
							$author$project$MuchSelect$NoEffect);
					case 'search-string-minimum-length':
						if (newAttributeValue === '') {
							return _Utils_Tuple2(
								$author$project$MuchSelect$updateModelWithChangesThatEffectTheOptionsWhenTheSearchStringChanges(
									_Utils_update(
										model,
										{
											a: A2($author$project$SelectionMode$setSearchStringMinimumLength, $author$project$OutputStyle$NoMinimumToSearchStringLength, model.a)
										})),
								$author$project$MuchSelect$NoEffect);
						} else {
							var _v42 = $author$project$PositiveInt$fromString(newAttributeValue);
							if (!_v42.$) {
								var minimumLength = _v42.a;
								return _Utils_Tuple2(
									$author$project$MuchSelect$updateModelWithChangesThatEffectTheOptionsWhenTheSearchStringChanges(
										_Utils_update(
											model,
											{
												a: A2(
													$author$project$SelectionMode$setSearchStringMinimumLength,
													$author$project$OutputStyle$FixedSearchStringMinimumLength(minimumLength),
													model.a)
											})),
									$author$project$MuchSelect$NoEffect);
							} else {
								return _Utils_Tuple2(
									model,
									$author$project$MuchSelect$ReportErrorMessage('Search string minimum length needs to be a positive integer'));
							}
						}
					case 'selected-option-goes-to-top':
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									a: A2($author$project$SelectionMode$setSelectedItemStaysInPlaceWithBool, false, model.a)
								}),
							$author$project$MuchSelect$NoEffect);
					case 'selected-value':
						var _v43 = A2($author$project$SelectedValueEncoding$stringToValueStrings, model.h, newAttributeValue);
						if (!_v43.$) {
							var selectedValueStrings = _v43.a;
							if (A2($author$project$OptionList$selectedOptionValuesAreEqual, selectedValueStrings, model.b)) {
								return _Utils_Tuple2(model, $author$project$MuchSelect$NoEffect);
							} else {
								if (!selectedValueStrings.b) {
									return $author$project$MuchSelect$clearAllSelectedOptions(model);
								} else {
									if (!selectedValueStrings.b.b) {
										var selectedValueString = selectedValueStrings.a;
										if (selectedValueString === '') {
											return $author$project$MuchSelect$clearAllSelectedOptions(model);
										} else {
											var newOptions = A2(
												$author$project$OptionList$addAndSelectOptionsInOptionsListByString,
												selectedValueStrings,
												$author$project$OptionList$deselectAll(model.b));
											return _Utils_Tuple2(
												$author$project$MuchSelect$updateModelWithChangesThatEffectTheOptionsWhenTheSearchStringChanges(
													_Utils_update(
														model,
														{b: newOptions})),
												A4(
													$author$project$MuchSelect$makeEffectsWhenValuesChanges,
													$author$project$SelectionMode$getEventMode(model.a),
													$author$project$SelectionMode$getSelectionMode(model.a),
													model.h,
													$author$project$OptionList$selectedOptions(newOptions)));
										}
									} else {
										var newOptions = A2(
											$author$project$OptionList$addAndSelectOptionsInOptionsListByString,
											selectedValueStrings,
											$author$project$OptionList$deselectAll(model.b));
										return _Utils_Tuple2(
											$author$project$MuchSelect$updateModelWithChangesThatEffectTheOptionsWhenTheSearchStringChanges(
												_Utils_update(
													model,
													{b: newOptions})),
											A4(
												$author$project$MuchSelect$makeEffectsWhenValuesChanges,
												$author$project$SelectionMode$getEventMode(model.a),
												$author$project$SelectionMode$getSelectionMode(model.a),
												model.h,
												$author$project$OptionList$selectedOptions(newOptions)));
									}
								}
							}
						} else {
							var error = _v43.a;
							return _Utils_Tuple2(
								model,
								$author$project$MuchSelect$ReportErrorMessage(error));
						}
					case 'selected-value-encoding':
						var _v46 = $author$project$SelectedValueEncoding$fromString(newAttributeValue);
						if (!_v46.$) {
							var selectedValueEncoding = _v46.a;
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{h: selectedValueEncoding}),
								$author$project$MuchSelect$NoEffect);
						} else {
							var error = _v46.a;
							return _Utils_Tuple2(
								model,
								$author$project$MuchSelect$ReportErrorMessage(error));
						}
					case 'show-dropdown-footer':
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									a: A2($author$project$SelectionMode$setDropdownStyle, 1, model.a)
								}),
							$author$project$MuchSelect$NoEffect);
					default:
						var unknownAttribute = attributeName;
						return _Utils_Tuple2(
							model,
							$author$project$MuchSelect$ReportErrorMessage('Unknown attribute: ' + unknownAttribute));
				}
			case 48:
				var attributeName = msg.a;
				switch (attributeName) {
					case 'allow-custom-options':
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									m: A2($author$project$DomStateCache$updateAllowCustomOptions, $author$project$DomStateCache$CustomOptionsNotAllowed, model.m),
									a: A3($author$project$SelectionMode$setAllowCustomOptionsWithBool, false, $elm$core$Maybe$Nothing, model.a)
								}),
							$author$project$MuchSelect$NoEffect);
					case 'disabled':
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									m: A2($author$project$DomStateCache$updateDisabledAttribute, 1, model.m),
									a: A2($author$project$SelectionMode$setIsDisabled, false, model.a)
								}),
							$author$project$MuchSelect$NoEffect);
					case 'events-only':
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									a: A2($author$project$SelectionMode$setEventsOnly, false, model.a)
								}),
							$author$project$MuchSelect$NoEffect);
					case 'loading':
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									d: A4(
										$author$project$RightSlot$updateRightSlotLoading,
										model.d,
										model.a,
										$author$project$OptionList$selectedOptions(model.b),
										false)
								}),
							$author$project$MuchSelect$NoEffect);
					case 'max-dropdown-items':
						return _Utils_Tuple2(
							$author$project$MuchSelect$updateModelWithChangesThatEffectTheOptionsWhenTheSearchStringChanges(
								_Utils_update(
									model,
									{
										a: A2(
											$author$project$SelectionMode$setMaxDropdownItems,
											$author$project$OutputStyle$FixedMaxDropdownItems($author$project$OutputStyle$defaultMaxDropdownItemsNum),
											model.a)
									})),
							$author$project$MuchSelect$NoEffect);
					case 'multi-select':
						var updatedOptions = $author$project$OptionList$deselectAllButTheFirstSelectedOptionInList(model.b);
						return _Utils_Tuple2(
							$author$project$MuchSelect$updateModelWithChangesThatEffectTheOptionsWhenTheSearchStringChanges(
								_Utils_update(
									model,
									{
										b: updatedOptions,
										a: A2($author$project$SelectionMode$setMultiSelectModeWithBool, false, model.a)
									})),
							$author$project$MuchSelect$batch(
								_List_fromArray(
									[
										$author$project$MuchSelect$ReportReady,
										A2($author$project$MuchSelect$makeEffectsForUpdatingOptionsInTheWebWorker, model.q, model.g),
										A4(
										$author$project$MuchSelect$makeEffectsWhenValuesChanges,
										$author$project$SelectionMode$getEventMode(model.a),
										$author$project$SelectionMode$getSelectionMode(model.a),
										model.h,
										$author$project$OptionList$selectedOptions(updatedOptions))
									])));
					case 'multi-select-single-item-removal':
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									a: A2($author$project$SelectionMode$setSingleItemRemoval, 1, model.a)
								}),
							$author$project$MuchSelect$ReportReady);
					case 'option-sorting':
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{M: 0}),
							$author$project$MuchSelect$NoEffect);
					case 'output-style':
						var newSelectionConfig = A3($author$project$SelectionMode$setOutputStyle, model.m, 0, model.a);
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									d: A4(
										$author$project$RightSlot$updateRightSlot,
										model.d,
										$author$project$SelectionMode$getOutputStyle(newSelectionConfig),
										$author$project$SelectionMode$getSelectionMode(newSelectionConfig),
										$author$project$OptionList$selectedOptions(model.b)),
									a: newSelectionConfig
								}),
							$author$project$MuchSelect$FetchOptionsFromDom);
					case 'placeholder':
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									a: A2(
										$author$project$SelectionMode$setPlaceholder,
										_Utils_Tuple2(false, ''),
										model.a)
								}),
							$author$project$MuchSelect$NoEffect);
					case 'search-string-minimum-length':
						return _Utils_Tuple2(
							$author$project$MuchSelect$updateModelWithChangesThatEffectTheOptionsWhenTheSearchStringChanges(
								_Utils_update(
									model,
									{
										a: A2($author$project$SelectionMode$setSearchStringMinimumLength, $author$project$OutputStyle$NoMinimumToSearchStringLength, model.a)
									})),
							$author$project$MuchSelect$NoEffect);
					case 'selected-option-goes-to-top':
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									a: A2($author$project$SelectionMode$setSelectedItemStaysInPlaceWithBool, true, model.a)
								}),
							$author$project$MuchSelect$NoEffect);
					case 'selected-value':
						return $author$project$MuchSelect$clearAllSelectedOptions(model);
					case 'selected-value-encoding':
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{h: $author$project$SelectedValueEncoding$defaultSelectedValueEncoding}),
							$author$project$MuchSelect$NoEffect);
					case 'show-dropdown-footer':
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									a: A2($author$project$SelectionMode$setDropdownStyle, 0, model.a)
								}),
							$author$project$MuchSelect$NoEffect);
					default:
						var unknownAttribute = attributeName;
						return _Utils_Tuple2(
							model,
							$author$project$MuchSelect$ReportErrorMessage('Unknown attribute: ' + unknownAttribute));
				}
			case 49:
				var customOptionHint = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							a: A2($author$project$SelectionMode$setCustomOptionHint, customOptionHint, model.a)
						}),
					$author$project$MuchSelect$NoEffect);
			case 51:
				return _Utils_Tuple2(
					model,
					$author$project$MuchSelect$DumpConfigState(
						A4($author$project$ConfigDump$encodeConfig, model.a, model.M, model.h, model.d)));
			default:
				return _Utils_Tuple2(
					model,
					$author$project$MuchSelect$DumpSelectedValues(
						$elm$json$Json$Encode$object(
							_List_fromArray(
								[
									_Utils_Tuple2(
									'value',
									A2(
										$author$project$SelectedValueEncoding$selectedValue,
										$author$project$SelectionMode$getSelectionMode(model.a),
										model.b)),
									_Utils_Tuple2(
									'rawValue',
									A3(
										$author$project$SelectedValueEncoding$rawSelectedValue,
										$author$project$SelectionMode$getSelectionMode(model.a),
										model.h,
										model.b))
								]))));
		}
	});
var $author$project$MuchSelect$updateWrapper = F2(
	function (msg, model) {
		return A2(
			$elm$core$Tuple$mapSecond,
			$author$project$MuchSelect$perform,
			A2($author$project$MuchSelect$update, msg, model));
	});
var $author$project$MuchSelect$NoOp = {$: 0};
var $elm$virtual_dom$VirtualDom$attribute = F2(
	function (key, value) {
		return A2(
			_VirtualDom_attribute,
			_VirtualDom_noOnOrFormAction(key),
			_VirtualDom_noJavaScriptOrHtmlUri(value));
	});
var $elm$html$Html$Attributes$attribute = $elm$virtual_dom$VirtualDom$attribute;
var $elm$html$Html$Attributes$stringProperty = F2(
	function (key, string) {
		return A2(
			_VirtualDom_property,
			key,
			$elm$json$Json$Encode$string(string));
	});
var $elm$html$Html$Attributes$class = $elm$html$Html$Attributes$stringProperty('className');
var $elm$html$Html$Attributes$classList = function (classes) {
	return $elm$html$Html$Attributes$class(
		A2(
			$elm$core$String$join,
			' ',
			A2(
				$elm$core$List$map,
				$elm$core$Tuple$first,
				A2($elm$core$List$filter, $elm$core$Tuple$second, classes))));
};
var $author$project$MuchSelect$DropdownMouseDownOption = function (a) {
	return {$: 7, a: a};
};
var $author$project$MuchSelect$DropdownMouseOutOption = function (a) {
	return {$: 6, a: a};
};
var $author$project$MuchSelect$DropdownMouseOverOption = function (a) {
	return {$: 5, a: a};
};
var $author$project$MuchSelect$DropdownMouseUpOption = function (a) {
	return {$: 8, a: a};
};
var $elm$html$Html$div = _VirtualDom_node('div');
var $author$project$DropdownOptions$getSearchFilters = function (dropdownOptions) {
	return A2(
		$elm$core$List$map,
		function (option) {
			return $author$project$Option$getMaybeOptionSearchFilter(option);
		},
		$author$project$OptionList$getOptions(
			$author$project$DropdownOptions$getOptions(dropdownOptions)));
};
var $author$project$OptionSearcher$doesSearchStringFindNothing = F3(
	function (searchString, searchStringMinimumLength, options) {
		if (searchStringMinimumLength.$ === 1) {
			return true;
		} else {
			var num = searchStringMinimumLength.a;
			return (_Utils_cmp(
				$author$project$SearchString$length(searchString),
				$author$project$PositiveInt$toInt(num)) < 1) ? false : A2(
				$elm$core$List$all,
				function (maybeOptionSearchFilter) {
					if (maybeOptionSearchFilter.$ === 1) {
						return false;
					} else {
						var optionSearchFilter = maybeOptionSearchFilter.a;
						return optionSearchFilter.cS > 1000;
					}
				},
				$author$project$DropdownOptions$getSearchFilters(options));
		}
	});
var $elm$core$String$fromFloat = _String_fromNumber;
var $author$project$GroupedDropdownOptions$DropdownOptionsGroup = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $author$project$OptionGroup$new = function (string) {
	return (string === '') ? $author$project$OptionGroup$NoOptionGroup : $author$project$OptionGroup$OptionGroup(string);
};
var $author$project$Option$getOptionGroup = function (option) {
	switch (option.$) {
		case 0:
			var fancyOption = option.a;
			return $author$project$FancyOption$getOptionGroup(fancyOption);
		case 1:
			return $author$project$OptionGroup$new('');
		default:
			return $author$project$OptionGroup$new('');
	}
};
var $elm_community$list_extra$List$Extra$groupWhile = F2(
	function (isSameGroup, items) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, acc) {
					if (!acc.b) {
						return _List_fromArray(
							[
								_Utils_Tuple2(x, _List_Nil)
							]);
					} else {
						var _v1 = acc.a;
						var y = _v1.a;
						var restOfGroup = _v1.b;
						var groups = acc.b;
						return A2(isSameGroup, x, y) ? A2(
							$elm$core$List$cons,
							_Utils_Tuple2(
								x,
								A2($elm$core$List$cons, y, restOfGroup)),
							groups) : A2(
							$elm$core$List$cons,
							_Utils_Tuple2(x, _List_Nil),
							acc);
					}
				}),
			_List_Nil,
			items);
	});
var $author$project$OptionList$appendOptions = F2(
	function (optionsA, optionsB) {
		return $author$project$OptionList$allFancyOptions(optionsA) ? $author$project$OptionList$FancyOptionList(
			_Utils_ap(optionsA, optionsB)) : ($author$project$OptionList$allDatalistOptions(optionsA) ? $author$project$OptionList$DatalistOptionList(
			_Utils_ap(optionsA, optionsB)) : ($author$project$OptionList$allSlottedOptions(optionsA) ? $author$project$OptionList$SlottedOptionList(
			_Utils_ap(optionsA, optionsB)) : $author$project$OptionList$FancyOptionList(_List_Nil)));
	});
var $author$project$OptionList$optionsPlusOne = F2(
	function (option, options) {
		return A2(
			$author$project$OptionList$appendOptions,
			_List_fromArray(
				[option]),
			options);
	});
var $author$project$DropdownOptions$groupInOrder = function (dropdownOptions) {
	var helper = F2(
		function (optionA, optionB) {
			return _Utils_eq(
				$author$project$Option$getOptionGroup(optionA),
				$author$project$Option$getOptionGroup(optionB));
		});
	return A2(
		$elm$core$List$map,
		function (_v0) {
			var firstOption = _v0.a;
			var restOfOptions = _v0.b;
			return _Utils_Tuple2(
				$author$project$Option$getOptionGroup(firstOption),
				$author$project$DropdownOptions$DropdownOptions(
					A2($author$project$OptionList$optionsPlusOne, firstOption, restOfOptions)));
		},
		A2(
			$elm_community$list_extra$List$Extra$groupWhile,
			helper,
			$author$project$OptionList$getOptions(
				$author$project$DropdownOptions$getOptions(dropdownOptions))));
};
var $author$project$GroupedDropdownOptions$groupOptionsInOrder = function (options) {
	return A2(
		$elm$core$List$map,
		function (_v0) {
			var group = _v0.a;
			var options_ = _v0.b;
			return A2($author$project$GroupedDropdownOptions$DropdownOptionsGroup, group, options_);
		},
		$author$project$DropdownOptions$groupInOrder(options));
};
var $elm$html$Html$Attributes$id = $elm$html$Html$Attributes$stringProperty('id');
var $author$project$DropdownOptions$isEmpty = function (dropdownOptions) {
	return $author$project$OptionList$isEmpty(
		$author$project$DropdownOptions$getOptions(dropdownOptions));
};
var $elm$html$Html$Attributes$name = $elm$html$Html$Attributes$stringProperty('name');
var $elm$virtual_dom$VirtualDom$node = function (tag) {
	return _VirtualDom_node(
		_VirtualDom_noScript(tag));
};
var $elm$html$Html$node = $elm$virtual_dom$VirtualDom$node;
var $author$project$GroupedDropdownOptions$getOptions = function (group) {
	var dropdownOptions = group.b;
	return dropdownOptions;
};
var $author$project$GroupedDropdownOptions$getOptionsGroup = function (dropdownOptionsGroup) {
	var optionGroup = dropdownOptionsGroup.a;
	return optionGroup;
};
var $author$project$DropdownOptions$maybeFirstOptionSearchFilter = function (dropdownOptions) {
	if (!dropdownOptions.$) {
		var options = dropdownOptions.a;
		return A2(
			$elm$core$Maybe$andThen,
			$author$project$Option$getMaybeOptionSearchFilter,
			$author$project$OptionList$head(options));
	} else {
		var options = dropdownOptions.a;
		return A2(
			$elm$core$Maybe$andThen,
			$author$project$Option$getMaybeOptionSearchFilter,
			$author$project$OptionList$head(options));
	}
};
var $elm$virtual_dom$VirtualDom$lazy2 = _VirtualDom_lazy2;
var $elm$html$Html$Lazy$lazy2 = $elm$virtual_dom$VirtualDom$lazy2;
var $elm$virtual_dom$VirtualDom$text = _VirtualDom_text;
var $elm$html$Html$text = $elm$virtual_dom$VirtualDom$text;
var $elm_community$html_extra$Html$Extra$nothing = $elm$html$Html$text('');
var $author$project$OptionDescription$toBool = function (optionDescription) {
	if (!optionDescription.$) {
		return true;
	} else {
		return false;
	}
};
var $author$project$FancyOption$hasDescription = function (option) {
	return $author$project$OptionDescription$toBool(
		$author$project$FancyOption$getOptionDescription(option));
};
var $elm$html$Html$span = _VirtualDom_node('span');
var $author$project$OptionPresentor$tokensToHtml = function (list) {
	return A2(
		$elm$core$List$map,
		function (_v0) {
			var highlighted = _v0.a;
			var string = _v0.b;
			return highlighted ? A2(
				$elm$html$Html$span,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('highlight')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text(string)
					])) : $elm$html$Html$text(string);
		},
		list);
};
var $author$project$FancyOption$descriptionHtml = function (fancyOption) {
	if ($author$project$FancyOption$hasDescription(fancyOption)) {
		var _v0 = $author$project$FancyOption$getMaybeOptionSearchFilter(fancyOption);
		if (!_v0.$) {
			var optionSearchFilter = _v0.a;
			return A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('description'),
						A2($elm$html$Html$Attributes$attribute, 'part', 'dropdown-option-description')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$span,
						_List_Nil,
						$author$project$OptionPresentor$tokensToHtml(optionSearchFilter.c1))
					]));
		} else {
			return A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('description'),
						A2($elm$html$Html$Attributes$attribute, 'part', 'dropdown-option-description')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$span,
						_List_Nil,
						_List_fromArray(
							[
								$elm$html$Html$text(
								$author$project$OptionDescription$toString(
									$author$project$FancyOption$getOptionDescription(fancyOption)))
							]))
					]));
		}
	} else {
		return $elm$html$Html$text('');
	}
};
var $author$project$FancyOption$getOptionPart = function (fancyOption) {
	switch (fancyOption.$) {
		case 0:
			var part = fancyOption.f;
			return part;
		case 1:
			return $author$project$OptionPart$empty;
		default:
			return $author$project$OptionPart$empty;
	}
};
var $author$project$FancyOption$labelHtml = function (option) {
	var _v0 = $author$project$FancyOption$getMaybeOptionSearchFilter(option);
	if (!_v0.$) {
		var optionSearchFilter = _v0.a;
		return A2(
			$elm$html$Html$span,
			_List_Nil,
			$author$project$OptionPresentor$tokensToHtml(optionSearchFilter.ds));
	} else {
		return A2(
			$elm$html$Html$span,
			_List_Nil,
			_List_fromArray(
				[
					$elm$html$Html$text(
					$author$project$OptionLabel$optionLabelToString(
						$author$project$FancyOption$getOptionLabel(option)))
				]));
	}
};
var $elm$virtual_dom$VirtualDom$Custom = function (a) {
	return {$: 3, a: a};
};
var $elm$virtual_dom$VirtualDom$on = _VirtualDom_on;
var $elm$html$Html$Events$custom = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$Custom(decoder));
	});
var $author$project$Events$mouseDownPreventDefault = function (message) {
	return A2(
		$elm$html$Html$Events$custom,
		'mousedown',
		$elm$json$Json$Decode$succeed(
			{X: message, aa: true, ab: false}));
};
var $author$project$Events$mouseUpPreventDefault = function (message) {
	return A2(
		$elm$html$Html$Events$custom,
		'mouseup',
		$elm$json$Json$Decode$succeed(
			{X: message, aa: true, ab: false}));
};
var $author$project$Events$onClickPreventDefault = function (message) {
	return A2(
		$elm$html$Html$Events$custom,
		'click',
		$elm$json$Json$Decode$succeed(
			{X: message, aa: true, ab: false}));
};
var $author$project$Events$onClickPreventDefaultAndStopPropagation = function (message) {
	return A2(
		$elm$html$Html$Events$custom,
		'click',
		$elm$json$Json$Decode$succeed(
			{X: message, aa: true, ab: true}));
};
var $elm$virtual_dom$VirtualDom$Normal = function (a) {
	return {$: 0, a: a};
};
var $elm$html$Html$Events$on = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$Normal(decoder));
	});
var $elm$html$Html$Events$onMouseEnter = function (msg) {
	return A2(
		$elm$html$Html$Events$on,
		'mouseenter',
		$elm$json$Json$Decode$succeed(msg));
};
var $elm$html$Html$Events$onMouseLeave = function (msg) {
	return A2(
		$elm$html$Html$Events$on,
		'mouseleave',
		$elm$json$Json$Decode$succeed(msg));
};
var $author$project$OptionPart$toActiveDropdownAttribute = function (optionPart) {
	var string = optionPart;
	if (string === '') {
		return A2($elm$html$Html$Attributes$attribute, 'part', 'dropdown-option active highlighted');
	} else {
		return A2($elm$html$Html$Attributes$attribute, 'part', 'dropdown-option active highlighted ' + string);
	}
};
var $author$project$OptionPart$toDisabledDropdownAttribute = function (optionPart) {
	var string = optionPart;
	if (string === '') {
		return A2($elm$html$Html$Attributes$attribute, 'part', 'dropdown-option disabled');
	} else {
		return A2($elm$html$Html$Attributes$attribute, 'part', 'dropdown-option disabled ' + string);
	}
};
var $author$project$OptionPart$toDropdownAttribute = function (optionPart) {
	var string = optionPart;
	if (string === '') {
		return A2($elm$html$Html$Attributes$attribute, 'part', 'dropdown-option');
	} else {
		return A2($elm$html$Html$Attributes$attribute, 'part', 'dropdown-option ' + string);
	}
};
var $author$project$FancyOption$valueDataAttribute = function (option) {
	return A2(
		$elm$html$Html$Attributes$attribute,
		'data-value',
		$author$project$FancyOption$getOptionValueAsString(option));
};
var $author$project$FancyOption$toDropdownOptionSelectedHighlightedHtml = F2(
	function (eventHandlers, option) {
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Events$onMouseEnter(
					eventHandlers.dC(
						$author$project$FancyOption$getOptionValue(option))),
					$elm$html$Html$Events$onMouseLeave(
					eventHandlers.dB(
						$author$project$FancyOption$getOptionValue(option))),
					$author$project$Events$mouseDownPreventDefault(
					eventHandlers.dA(
						$author$project$FancyOption$getOptionValue(option))),
					$author$project$Events$mouseUpPreventDefault(
					eventHandlers.dD(
						$author$project$FancyOption$getOptionValue(option))),
					A2($elm$html$Html$Attributes$attribute, 'part', 'dropdown-option selected highlighted'),
					$author$project$OptionPart$toDropdownAttribute(
					$author$project$FancyOption$getOptionPart(option)),
					$elm$html$Html$Attributes$class('option selected highlighted'),
					$author$project$FancyOption$valueDataAttribute(option)
				]),
			_List_fromArray(
				[
					$author$project$FancyOption$labelHtml(option),
					$author$project$FancyOption$descriptionHtml(option)
				]));
	});
var $author$project$FancyOption$toDropdownOptionSelectedHtml = F2(
	function (eventHandlers, option) {
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Events$onMouseEnter(
					eventHandlers.dC(
						$author$project$FancyOption$getOptionValue(option))),
					$elm$html$Html$Events$onMouseLeave(
					eventHandlers.dB(
						$author$project$FancyOption$getOptionValue(option))),
					$author$project$Events$mouseDownPreventDefault(
					eventHandlers.dA(
						$author$project$FancyOption$getOptionValue(option))),
					$author$project$Events$mouseUpPreventDefault(
					eventHandlers.dD(
						$author$project$FancyOption$getOptionValue(option))),
					A2($elm$html$Html$Attributes$attribute, 'part', 'dropdown-option selected'),
					$author$project$OptionPart$toDropdownAttribute(
					$author$project$FancyOption$getOptionPart(option)),
					$elm$html$Html$Attributes$class('option selected'),
					$author$project$FancyOption$valueDataAttribute(option)
				]),
			_List_fromArray(
				[
					$author$project$FancyOption$labelHtml(option),
					$author$project$FancyOption$descriptionHtml(option)
				]));
	});
var $author$project$OptionPart$toHighlightedDropdownAttribute = function (optionPart) {
	var string = optionPart;
	if (string === '') {
		return A2($elm$html$Html$Attributes$attribute, 'part', 'dropdown-option highlighted');
	} else {
		return A2($elm$html$Html$Attributes$attribute, 'part', 'dropdown-option highlighted ' + string);
	}
};
var $author$project$FancyOption$toDropdownHtml = F3(
	function (eventHandlers, selectionMode, option) {
		var _v0 = $author$project$FancyOption$getOptionDisplay(option);
		switch (_v0.$) {
			case 0:
				return A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Events$onMouseEnter(
							eventHandlers.dC(
								$author$project$FancyOption$getOptionValue(option))),
							$elm$html$Html$Events$onMouseLeave(
							eventHandlers.dB(
								$author$project$FancyOption$getOptionValue(option))),
							$author$project$Events$mouseDownPreventDefault(
							eventHandlers.dA(
								$author$project$FancyOption$getOptionValue(option))),
							$author$project$Events$mouseUpPreventDefault(
							eventHandlers.dD(
								$author$project$FancyOption$getOptionValue(option))),
							$author$project$Events$onClickPreventDefault(eventHandlers.dH),
							$author$project$OptionPart$toDropdownAttribute(
							$author$project$FancyOption$getOptionPart(option)),
							$elm$html$Html$Attributes$class('option'),
							$author$project$FancyOption$valueDataAttribute(option)
						]),
					_List_fromArray(
						[
							$author$project$FancyOption$labelHtml(option),
							$author$project$FancyOption$descriptionHtml(option)
						]));
			case 1:
				return $elm_community$html_extra$Html$Extra$nothing;
			case 2:
				if (!selectionMode) {
					return A2($author$project$FancyOption$toDropdownOptionSelectedHtml, eventHandlers, option);
				} else {
					return $elm_community$html_extra$Html$Extra$nothing;
				}
			case 4:
				return A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$attribute, 'part', 'dropdown-option disabled pending-validation'),
							$elm$html$Html$Attributes$class('option disabled pending-validation'),
							$author$project$OptionPart$toDropdownAttribute(
							$author$project$FancyOption$getOptionPart(option)),
							$author$project$FancyOption$valueDataAttribute(option)
						]),
					_List_fromArray(
						[
							$author$project$FancyOption$labelHtml(option),
							$author$project$FancyOption$descriptionHtml(option)
						]));
			case 3:
				return $elm_community$html_extra$Html$Extra$nothing;
			case 5:
				if (!selectionMode) {
					return A2($author$project$FancyOption$toDropdownOptionSelectedHighlightedHtml, eventHandlers, option);
				} else {
					return $elm_community$html_extra$Html$Extra$nothing;
				}
			case 6:
				return A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Events$onMouseEnter(
							eventHandlers.dC(
								$author$project$FancyOption$getOptionValue(option))),
							$elm$html$Html$Events$onMouseLeave(
							eventHandlers.dB(
								$author$project$FancyOption$getOptionValue(option))),
							$author$project$Events$mouseDownPreventDefault(
							eventHandlers.dA(
								$author$project$FancyOption$getOptionValue(option))),
							$author$project$Events$mouseUpPreventDefault(
							eventHandlers.dD(
								$author$project$FancyOption$getOptionValue(option))),
							$elm$html$Html$Attributes$class('option highlighted'),
							$author$project$OptionPart$toHighlightedDropdownAttribute(
							$author$project$FancyOption$getOptionPart(option)),
							$author$project$FancyOption$valueDataAttribute(option)
						]),
					_List_fromArray(
						[
							$author$project$FancyOption$labelHtml(option),
							$author$project$FancyOption$descriptionHtml(option)
						]));
			case 7:
				return A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Events$onMouseEnter(
							eventHandlers.dC(
								$author$project$FancyOption$getOptionValue(option))),
							$elm$html$Html$Events$onMouseLeave(
							eventHandlers.dB(
								$author$project$FancyOption$getOptionValue(option))),
							$author$project$Events$mouseDownPreventDefault(
							eventHandlers.dA(
								$author$project$FancyOption$getOptionValue(option))),
							$author$project$Events$mouseUpPreventDefault(
							eventHandlers.dD(
								$author$project$FancyOption$getOptionValue(option))),
							$author$project$Events$onClickPreventDefaultAndStopPropagation(eventHandlers.dH),
							$elm$html$Html$Attributes$class('option active highlighted'),
							$author$project$OptionPart$toActiveDropdownAttribute(
							$author$project$FancyOption$getOptionPart(option)),
							$author$project$FancyOption$valueDataAttribute(option)
						]),
					_List_fromArray(
						[
							$author$project$FancyOption$labelHtml(option),
							$author$project$FancyOption$descriptionHtml(option)
						]));
			default:
				return A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('option disabled'),
							$author$project$OptionPart$toDisabledDropdownAttribute(
							$author$project$FancyOption$getOptionPart(option)),
							$author$project$FancyOption$valueDataAttribute(option)
						]),
					_List_fromArray(
						[
							$author$project$FancyOption$labelHtml(option),
							$author$project$FancyOption$descriptionHtml(option)
						]));
		}
	});
var $author$project$DropdownOptions$optionToCustomHtml = F3(
	function (eventHandlers, selectionConfig_, option_) {
		return A3(
			$elm$html$Html$Lazy$lazy2,
			F2(
				function (selectionConfig, option) {
					if (!option.$) {
						var fancyOption = option.a;
						return A3(
							$author$project$FancyOption$toDropdownHtml,
							eventHandlers,
							$author$project$SelectionMode$getSelectionMode(selectionConfig),
							fancyOption);
					} else {
						return $elm_community$html_extra$Html$Extra$nothing;
					}
				}),
			selectionConfig_,
			option_);
	});
var $author$project$DropdownOptions$optionsToCustomHtml = F3(
	function (dropdownItemEventListeners, selectionConfig, dropdownOptions) {
		if (!dropdownOptions.$) {
			var options = dropdownOptions.a;
			return A2(
				$author$project$OptionList$andMap,
				A2($author$project$DropdownOptions$optionToCustomHtml, dropdownItemEventListeners, selectionConfig),
				options);
		} else {
			var options = dropdownOptions.a;
			return A2(
				$author$project$OptionList$andMap,
				A2($author$project$DropdownOptions$optionToCustomHtml, dropdownItemEventListeners, selectionConfig),
				options);
		}
	});
var $author$project$GroupedDropdownOptions$optionGroupToHtml = F3(
	function (dropdownItemEventListeners, selectionMode, dropdownOptionsGroup) {
		var optionGroupHtml = function () {
			var _v0 = $author$project$DropdownOptions$maybeFirstOptionSearchFilter(
				$author$project$GroupedDropdownOptions$getOptions(dropdownOptionsGroup));
			if (!_v0.$) {
				var optionSearchFilter = _v0.a;
				var _v1 = $author$project$OptionGroup$toString(
					$author$project$GroupedDropdownOptions$getOptionsGroup(dropdownOptionsGroup));
				if (_v1 === '') {
					return $elm$html$Html$text('');
				} else {
					return A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('optgroup'),
								A2($elm$html$Html$Attributes$attribute, 'part', 'dropdown-optgroup')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$span,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('optgroup-header')
									]),
								$author$project$OptionPresentor$tokensToHtml(optionSearchFilter.dd))
							]));
				}
			} else {
				var _v2 = $author$project$OptionGroup$toString(
					$author$project$GroupedDropdownOptions$getOptionsGroup(dropdownOptionsGroup));
				if (_v2 === '') {
					return $elm$html$Html$text('');
				} else {
					var optionGroupAsString = _v2;
					return A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('optgroup'),
								A2($elm$html$Html$Attributes$attribute, 'part', 'dropdown-optgroup')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$span,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('optgroup-header')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text(optionGroupAsString)
									]))
							]));
				}
			}
		}();
		return A2(
			$elm$core$List$cons,
			optionGroupHtml,
			A3(
				$author$project$DropdownOptions$optionsToCustomHtml,
				dropdownItemEventListeners,
				selectionMode,
				$author$project$GroupedDropdownOptions$getOptions(dropdownOptionsGroup)));
	});
var $author$project$GroupedDropdownOptions$optionGroupsToHtml = F3(
	function (dropdownItemEventListeners, selectionConfig, groupedDropdownOptions) {
		return A2(
			$elm$core$List$concatMap,
			A2($author$project$GroupedDropdownOptions$optionGroupToHtml, dropdownItemEventListeners, selectionConfig),
			groupedDropdownOptions);
	});
var $author$project$OutputStyle$NotManagedByMe = 2;
var $author$project$SelectionMode$getDropdownState = function (selectionConfig) {
	if (!selectionConfig.$) {
		var singleSelectOutputStyle = selectionConfig.a;
		if (!singleSelectOutputStyle.$) {
			var singleSelectCustomHtmlFields = singleSelectOutputStyle.a;
			return singleSelectCustomHtmlFields.U;
		} else {
			return 2;
		}
	} else {
		var multiSelectOutputStyle = selectionConfig.a;
		if (!multiSelectOutputStyle.$) {
			var multiSelectCustomHtmlFields = multiSelectOutputStyle.a;
			return multiSelectCustomHtmlFields.U;
		} else {
			return 2;
		}
	}
};
var $author$project$SelectionMode$showDropdown = function (selectionConfig) {
	var _v0 = $author$project$SelectionMode$getDropdownState(selectionConfig);
	switch (_v0) {
		case 0:
			return true;
		case 1:
			return false;
		default:
			return false;
	}
};
var $elm$virtual_dom$VirtualDom$style = _VirtualDom_style;
var $elm$html$Html$Attributes$style = $elm$virtual_dom$VirtualDom$style;
var $author$project$MuchSelect$customHtmlDropdown = F4(
	function (selectionMode, options, searchString, _v0) {
		var valueCasingWidth = _v0.a;
		var valueCasingHeight = _v0.b;
		var optionsForTheDropdown = A2($author$project$DropdownOptions$figureOutWhichOptionsToShowInTheDropdown, selectionMode, options);
		var optionsHtml = $author$project$DropdownOptions$isEmpty(optionsForTheDropdown) ? _List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('option disabled')
					]),
				_List_fromArray(
					[
						A3(
						$elm$html$Html$node,
						'slot',
						_List_fromArray(
							[
								$elm$html$Html$Attributes$name('no-options')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('No available options')
							]))
					]))
			]) : (A3(
			$author$project$OptionSearcher$doesSearchStringFindNothing,
			searchString,
			$author$project$SelectionMode$getSearchStringMinimumLength(selectionMode),
			optionsForTheDropdown) ? _List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('option disabled')
					]),
				_List_fromArray(
					[
						A3(
						$elm$html$Html$node,
						'slot',
						_List_fromArray(
							[
								$elm$html$Html$Attributes$name('no-filtered-options')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('This filter returned no results.')
							]))
					]))
			]) : A3(
			$author$project$GroupedDropdownOptions$optionGroupsToHtml,
			{dA: $author$project$MuchSelect$DropdownMouseDownOption, dB: $author$project$MuchSelect$DropdownMouseOutOption, dC: $author$project$MuchSelect$DropdownMouseOverOption, dD: $author$project$MuchSelect$DropdownMouseUpOption, dH: $author$project$MuchSelect$NoOp},
			selectionMode,
			$author$project$GroupedDropdownOptions$groupOptionsInOrder(optionsForTheDropdown)));
		var dropdownFooterHtml = ($author$project$SelectionMode$showDropdownFooter(selectionMode) && (_Utils_cmp(
			$author$project$DropdownOptions$length(optionsForTheDropdown),
			$author$project$OptionList$length(options)) < 0)) ? A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$id('dropdown-footer'),
					A2($elm$html$Html$Attributes$attribute, 'part', 'dropdown-footer')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text(
					'showing ' + ($elm$core$String$fromInt(
						$author$project$DropdownOptions$length(optionsForTheDropdown)) + (' of ' + ($elm$core$String$fromInt(
						$author$project$OptionList$length(options)) + ' options'))))
				])) : $elm$html$Html$text('');
		return $author$project$SelectionMode$isDisabled(selectionMode) ? $elm$html$Html$text('') : A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$id('dropdown'),
					A2($elm$html$Html$Attributes$attribute, 'part', 'dropdown'),
					$elm$html$Html$Attributes$classList(
					_List_fromArray(
						[
							_Utils_Tuple2(
							'showing',
							$author$project$SelectionMode$showDropdown(selectionMode)),
							_Utils_Tuple2(
							'hiding',
							!$author$project$SelectionMode$showDropdown(selectionMode))
						])),
					A2(
					$elm$html$Html$Attributes$style,
					'top',
					$elm$core$String$fromFloat(valueCasingHeight) + 'px'),
					A2(
					$elm$html$Html$Attributes$style,
					'width',
					$elm$core$String$fromFloat(valueCasingWidth) + 'px')
				]),
			_Utils_ap(
				optionsHtml,
				_List_fromArray(
					[dropdownFooterHtml])));
	});
var $elm$html$Html$option = _VirtualDom_node('option');
var $elm$html$Html$Attributes$value = $elm$html$Html$Attributes$stringProperty('value');
var $author$project$DropdownOptions$optionToDatalistOption = function (option) {
	return A2(
		$elm$html$Html$option,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$value(
				$author$project$Option$getOptionValueAsString(option))
			]),
		_List_Nil);
};
var $author$project$DropdownOptions$dropdownOptionsToDatalistOption = function (dropdownOptions) {
	return A2(
		$author$project$OptionList$andMap,
		$author$project$DropdownOptions$optionToDatalistOption,
		$author$project$DropdownOptions$getOptions(dropdownOptions));
};
var $elm$html$Html$optgroup = _VirtualDom_node('optgroup');
var $author$project$GroupedDropdownOptions$dataListOptionGroupToHtml = function (groupedDropdownOptions) {
	return A2(
		$elm$core$List$concatMap,
		function (_v0) {
			var optionGroup = _v0.a;
			var dropdownOptions = _v0.b;
			var _v1 = $author$project$OptionGroup$toString(optionGroup);
			if (_v1 === '') {
				return $author$project$DropdownOptions$dropdownOptionsToDatalistOption(dropdownOptions);
			} else {
				var optionGroupAsString = _v1;
				return _List_fromArray(
					[
						A2(
						$elm$html$Html$optgroup,
						_List_fromArray(
							[
								A2($elm$html$Html$Attributes$attribute, 'label', optionGroupAsString)
							]),
						$author$project$DropdownOptions$dropdownOptionsToDatalistOption(dropdownOptions))
					]);
			}
		},
		groupedDropdownOptions);
};
var $elm$html$Html$datalist = _VirtualDom_node('datalist');
var $author$project$GroupedDropdownOptions$dropdownOptionsToDatalistHtml = function (options) {
	return A2(
		$elm$html$Html$datalist,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$id('datalist-options')
			]),
		$author$project$GroupedDropdownOptions$dataListOptionGroupToHtml(
			$author$project$GroupedDropdownOptions$groupOptionsInOrder(options)));
};
var $elm_community$html_extra$Html$Attributes$Extra$empty = $elm$html$Html$Attributes$classList(_List_Nil);
var $author$project$SelectionMode$isSingleSelect = function (selectionMode) {
	if (!selectionMode.$) {
		return true;
	} else {
		return false;
	}
};
var $author$project$OptionList$isSlottedOptionList = function (optionList) {
	if (optionList.$ === 2) {
		return true;
	} else {
		return false;
	}
};
var $ohanhi$keyboard$Keyboard$ArrowDown = {$: 18};
var $ohanhi$keyboard$Keyboard$ArrowUp = {$: 21};
var $ohanhi$keyboard$Keyboard$Backspace = {$: 26};
var $author$project$MuchSelect$BringInputInFocus = {$: 1};
var $ohanhi$keyboard$Keyboard$Delete = {$: 31};
var $author$project$MuchSelect$DeleteKeydownForMultiSelect = {$: 40};
var $ohanhi$keyboard$Keyboard$Enter = {$: 15};
var $ohanhi$keyboard$Keyboard$Escape = {$: 62};
var $author$project$MuchSelect$EscapeKeyInInputFilter = {$: 34};
var $author$project$MuchSelect$InputBlur = {$: 3};
var $author$project$MuchSelect$InputFocus = {$: 4};
var $robinheghan$keyboard_events$Keyboard$Events$Keydown = 0;
var $author$project$MuchSelect$MoveHighlightedOptionDown = {$: 36};
var $author$project$MuchSelect$MoveHighlightedOptionUp = {$: 35};
var $author$project$MuchSelect$SelectHighlightedOption = {$: 32};
var $author$project$MuchSelect$UpdateSearchString = function (a) {
	return {$: 9, a: a};
};
var $elm$html$Html$Attributes$boolProperty = F2(
	function (key, bool) {
		return A2(
			_VirtualDom_property,
			key,
			$elm$json$Json$Encode$bool(bool));
	});
var $elm$html$Html$Attributes$disabled = $elm$html$Html$Attributes$boolProperty('disabled');
var $author$project$SelectionMode$getInteractionState = function (selectionConfig) {
	if (!selectionConfig.$) {
		var interactionState = selectionConfig.c;
		return interactionState;
	} else {
		var interactionState = selectionConfig.c;
		return interactionState;
	}
};
var $author$project$SelectionMode$getPlaceholderString = function (selectionConfig) {
	return $author$project$SelectionMode$getPlaceholder(selectionConfig).b;
};
var $author$project$OptionList$hasAnyValidationErrors = function (optionList) {
	return A2($author$project$OptionList$any, $author$project$Option$isInvalid, optionList);
};
var $elm$html$Html$input = _VirtualDom_node('input');
var $robinheghan$keyboard_events$Keyboard$Events$eventToString = function (event) {
	switch (event) {
		case 0:
			return 'keydown';
		case 1:
			return 'keyup';
		default:
			return 'keypress';
	}
};
var $ohanhi$keyboard$Keyboard$Clear = {$: 27};
var $ohanhi$keyboard$Keyboard$Copy = {$: 28};
var $ohanhi$keyboard$Keyboard$CrSel = {$: 29};
var $ohanhi$keyboard$Keyboard$Cut = {$: 30};
var $ohanhi$keyboard$Keyboard$EraseEof = {$: 32};
var $ohanhi$keyboard$Keyboard$ExSel = {$: 33};
var $ohanhi$keyboard$Keyboard$Insert = {$: 34};
var $ohanhi$keyboard$Keyboard$Paste = {$: 35};
var $ohanhi$keyboard$Keyboard$Redo = {$: 36};
var $ohanhi$keyboard$Keyboard$Undo = {$: 37};
var $ohanhi$keyboard$Keyboard$editingKey = function (_v0) {
	var value = _v0;
	switch (value) {
		case 'Backspace':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$Backspace);
		case 'Clear':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$Clear);
		case 'Copy':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$Copy);
		case 'CrSel':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$CrSel);
		case 'Cut':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$Cut);
		case 'Delete':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$Delete);
		case 'EraseEof':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$EraseEof);
		case 'ExSel':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$ExSel);
		case 'Insert':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$Insert);
		case 'Paste':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$Paste);
		case 'Redo':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$Redo);
		case 'Undo':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$Undo);
		default:
			return $elm$core$Maybe$Nothing;
	}
};
var $ohanhi$keyboard$Keyboard$F1 = {$: 38};
var $ohanhi$keyboard$Keyboard$F10 = {$: 47};
var $ohanhi$keyboard$Keyboard$F11 = {$: 48};
var $ohanhi$keyboard$Keyboard$F12 = {$: 49};
var $ohanhi$keyboard$Keyboard$F13 = {$: 50};
var $ohanhi$keyboard$Keyboard$F14 = {$: 51};
var $ohanhi$keyboard$Keyboard$F15 = {$: 52};
var $ohanhi$keyboard$Keyboard$F16 = {$: 53};
var $ohanhi$keyboard$Keyboard$F17 = {$: 54};
var $ohanhi$keyboard$Keyboard$F18 = {$: 55};
var $ohanhi$keyboard$Keyboard$F19 = {$: 56};
var $ohanhi$keyboard$Keyboard$F2 = {$: 39};
var $ohanhi$keyboard$Keyboard$F20 = {$: 57};
var $ohanhi$keyboard$Keyboard$F3 = {$: 40};
var $ohanhi$keyboard$Keyboard$F4 = {$: 41};
var $ohanhi$keyboard$Keyboard$F5 = {$: 42};
var $ohanhi$keyboard$Keyboard$F6 = {$: 43};
var $ohanhi$keyboard$Keyboard$F7 = {$: 44};
var $ohanhi$keyboard$Keyboard$F8 = {$: 45};
var $ohanhi$keyboard$Keyboard$F9 = {$: 46};
var $ohanhi$keyboard$Keyboard$functionKey = function (_v0) {
	var value = _v0;
	switch (value) {
		case 'F1':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$F1);
		case 'F2':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$F2);
		case 'F3':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$F3);
		case 'F4':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$F4);
		case 'F5':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$F5);
		case 'F6':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$F6);
		case 'F7':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$F7);
		case 'F8':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$F8);
		case 'F9':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$F9);
		case 'F10':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$F10);
		case 'F11':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$F11);
		case 'F12':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$F12);
		case 'F13':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$F13);
		case 'F14':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$F14);
		case 'F15':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$F15);
		case 'F16':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$F16);
		case 'F17':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$F17);
		case 'F18':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$F18);
		case 'F19':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$F19);
		case 'F20':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$F20);
		default:
			return $elm$core$Maybe$Nothing;
	}
};
var $ohanhi$keyboard$Keyboard$ChannelDown = {$: 85};
var $ohanhi$keyboard$Keyboard$ChannelUp = {$: 86};
var $ohanhi$keyboard$Keyboard$MediaFastForward = {$: 87};
var $ohanhi$keyboard$Keyboard$MediaPause = {$: 88};
var $ohanhi$keyboard$Keyboard$MediaPlay = {$: 89};
var $ohanhi$keyboard$Keyboard$MediaPlayPause = {$: 90};
var $ohanhi$keyboard$Keyboard$MediaRecord = {$: 91};
var $ohanhi$keyboard$Keyboard$MediaRewind = {$: 92};
var $ohanhi$keyboard$Keyboard$MediaStop = {$: 93};
var $ohanhi$keyboard$Keyboard$MediaTrackNext = {$: 94};
var $ohanhi$keyboard$Keyboard$MediaTrackPrevious = {$: 95};
var $ohanhi$keyboard$Keyboard$mediaKey = function (_v0) {
	var value = _v0;
	switch (value) {
		case 'ChannelDown':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$ChannelDown);
		case 'ChannelUp':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$ChannelUp);
		case 'MediaFastForward':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$MediaFastForward);
		case 'MediaPause':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$MediaPause);
		case 'MediaPlay':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$MediaPlay);
		case 'MediaPlayPause':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$MediaPlayPause);
		case 'MediaRecord':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$MediaRecord);
		case 'MediaRewind':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$MediaRewind);
		case 'MediaStop':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$MediaStop);
		case 'MediaTrackNext':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$MediaTrackNext);
		case 'MediaTrackPrevious':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$MediaTrackPrevious);
		default:
			return $elm$core$Maybe$Nothing;
	}
};
var $ohanhi$keyboard$Keyboard$Alt = {$: 1};
var $ohanhi$keyboard$Keyboard$AltGraph = {$: 2};
var $ohanhi$keyboard$Keyboard$CapsLock = {$: 3};
var $ohanhi$keyboard$Keyboard$Control = {$: 4};
var $ohanhi$keyboard$Keyboard$Fn = {$: 5};
var $ohanhi$keyboard$Keyboard$FnLock = {$: 6};
var $ohanhi$keyboard$Keyboard$Hyper = {$: 7};
var $ohanhi$keyboard$Keyboard$Meta = {$: 8};
var $ohanhi$keyboard$Keyboard$NumLock = {$: 9};
var $ohanhi$keyboard$Keyboard$ScrollLock = {$: 10};
var $ohanhi$keyboard$Keyboard$Shift = {$: 11};
var $ohanhi$keyboard$Keyboard$Super = {$: 12};
var $ohanhi$keyboard$Keyboard$Symbol = {$: 13};
var $ohanhi$keyboard$Keyboard$SymbolLock = {$: 14};
var $ohanhi$keyboard$Keyboard$modifierKey = function (_v0) {
	var value = _v0;
	switch (value) {
		case 'Alt':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$Alt);
		case 'AltGraph':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$AltGraph);
		case 'CapsLock':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$CapsLock);
		case 'Control':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$Control);
		case 'Fn':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$Fn);
		case 'FnLock':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$FnLock);
		case 'Hyper':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$Hyper);
		case 'Meta':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$Meta);
		case 'NumLock':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$NumLock);
		case 'ScrollLock':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$ScrollLock);
		case 'Shift':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$Shift);
		case 'Super':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$Super);
		case 'OS':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$Super);
		case 'Symbol':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$Symbol);
		case 'SymbolLock':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$SymbolLock);
		default:
			return $elm$core$Maybe$Nothing;
	}
};
var $ohanhi$keyboard$Keyboard$ArrowLeft = {$: 19};
var $ohanhi$keyboard$Keyboard$ArrowRight = {$: 20};
var $ohanhi$keyboard$Keyboard$End = {$: 22};
var $ohanhi$keyboard$Keyboard$Home = {$: 23};
var $ohanhi$keyboard$Keyboard$PageDown = {$: 24};
var $ohanhi$keyboard$Keyboard$PageUp = {$: 25};
var $ohanhi$keyboard$Keyboard$navigationKey = function (_v0) {
	var value = _v0;
	switch (value) {
		case 'ArrowDown':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$ArrowDown);
		case 'ArrowLeft':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$ArrowLeft);
		case 'ArrowRight':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$ArrowRight);
		case 'ArrowUp':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$ArrowUp);
		case 'Down':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$ArrowDown);
		case 'Left':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$ArrowLeft);
		case 'Right':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$ArrowRight);
		case 'Up':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$ArrowUp);
		case 'End':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$End);
		case 'Home':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$Home);
		case 'PageDown':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$PageDown);
		case 'PageUp':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$PageUp);
		default:
			return $elm$core$Maybe$Nothing;
	}
};
var $ohanhi$keyboard$Keyboard$oneOf = F2(
	function (fns, key) {
		oneOf:
		while (true) {
			if (!fns.b) {
				return $elm$core$Maybe$Nothing;
			} else {
				var fn = fns.a;
				var rest = fns.b;
				var _v1 = fn(key);
				if (!_v1.$) {
					var a = _v1.a;
					return $elm$core$Maybe$Just(a);
				} else {
					var $temp$fns = rest,
						$temp$key = key;
					fns = $temp$fns;
					key = $temp$key;
					continue oneOf;
				}
			}
		}
	});
var $ohanhi$keyboard$Keyboard$AppSwitch = {$: 73};
var $ohanhi$keyboard$Keyboard$Call = {$: 74};
var $ohanhi$keyboard$Keyboard$Camera = {$: 75};
var $ohanhi$keyboard$Keyboard$CameraFocus = {$: 76};
var $ohanhi$keyboard$Keyboard$EndCall = {$: 77};
var $ohanhi$keyboard$Keyboard$GoBack = {$: 78};
var $ohanhi$keyboard$Keyboard$GoHome = {$: 79};
var $ohanhi$keyboard$Keyboard$HeadsetHook = {$: 80};
var $ohanhi$keyboard$Keyboard$LastNumberRedial = {$: 81};
var $ohanhi$keyboard$Keyboard$MannerMode = {$: 83};
var $ohanhi$keyboard$Keyboard$Notification = {$: 82};
var $ohanhi$keyboard$Keyboard$VoiceDial = {$: 84};
var $ohanhi$keyboard$Keyboard$phoneKey = function (_v0) {
	var value = _v0;
	switch (value) {
		case 'AppSwitch':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$AppSwitch);
		case 'Call':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$Call);
		case 'Camera':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$Camera);
		case 'CameraFocus':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$CameraFocus);
		case 'EndCall':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$EndCall);
		case 'GoBack':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$GoBack);
		case 'GoHome':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$GoHome);
		case 'HeadsetHook':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$HeadsetHook);
		case 'LastNumberRedial':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$LastNumberRedial);
		case 'Notification':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$Notification);
		case 'MannerMode':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$MannerMode);
		case 'VoiceDial':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$VoiceDial);
		default:
			return $elm$core$Maybe$Nothing;
	}
};
var $ohanhi$keyboard$Keyboard$Again = {$: 58};
var $ohanhi$keyboard$Keyboard$Attn = {$: 59};
var $ohanhi$keyboard$Keyboard$Cancel = {$: 60};
var $ohanhi$keyboard$Keyboard$ContextMenu = {$: 61};
var $ohanhi$keyboard$Keyboard$Execute = {$: 63};
var $ohanhi$keyboard$Keyboard$Find = {$: 64};
var $ohanhi$keyboard$Keyboard$Finish = {$: 65};
var $ohanhi$keyboard$Keyboard$Help = {$: 66};
var $ohanhi$keyboard$Keyboard$Pause = {$: 67};
var $ohanhi$keyboard$Keyboard$Play = {$: 68};
var $ohanhi$keyboard$Keyboard$Props = {$: 69};
var $ohanhi$keyboard$Keyboard$Select = {$: 70};
var $ohanhi$keyboard$Keyboard$ZoomIn = {$: 71};
var $ohanhi$keyboard$Keyboard$ZoomOut = {$: 72};
var $ohanhi$keyboard$Keyboard$uiKey = function (_v0) {
	var value = _v0;
	switch (value) {
		case 'Again':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$Again);
		case 'Attn':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$Attn);
		case 'Cancel':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$Cancel);
		case 'ContextMenu':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$ContextMenu);
		case 'Escape':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$Escape);
		case 'Execute':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$Execute);
		case 'Find':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$Find);
		case 'Finish':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$Finish);
		case 'Help':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$Help);
		case 'Pause':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$Pause);
		case 'Play':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$Play);
		case 'Props':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$Props);
		case 'Select':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$Select);
		case 'ZoomIn':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$ZoomIn);
		case 'ZoomOut':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$ZoomOut);
		default:
			return $elm$core$Maybe$Nothing;
	}
};
var $ohanhi$keyboard$Keyboard$Spacebar = {$: 17};
var $ohanhi$keyboard$Keyboard$Tab = {$: 16};
var $ohanhi$keyboard$Keyboard$whitespaceKey = function (_v0) {
	var value = _v0;
	switch (value) {
		case 'Enter':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$Enter);
		case 'Tab':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$Tab);
		case 'Spacebar':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$Spacebar);
		case ' ':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$Spacebar);
		default:
			return $elm$core$Maybe$Nothing;
	}
};
var $ohanhi$keyboard$Keyboard$anyKeyWith = function (charParser) {
	return $ohanhi$keyboard$Keyboard$oneOf(
		_List_fromArray(
			[$ohanhi$keyboard$Keyboard$whitespaceKey, charParser, $ohanhi$keyboard$Keyboard$modifierKey, $ohanhi$keyboard$Keyboard$navigationKey, $ohanhi$keyboard$Keyboard$editingKey, $ohanhi$keyboard$Keyboard$functionKey, $ohanhi$keyboard$Keyboard$uiKey, $ohanhi$keyboard$Keyboard$phoneKey, $ohanhi$keyboard$Keyboard$mediaKey]));
};
var $ohanhi$keyboard$Keyboard$Character = function (a) {
	return {$: 0, a: a};
};
var $elm$core$String$toUpper = _String_toUpper;
var $ohanhi$keyboard$Keyboard$characterKeyUpper = function (_v0) {
	var value = _v0;
	return ($elm$core$String$length(value) === 1) ? $elm$core$Maybe$Just(
		$ohanhi$keyboard$Keyboard$Character(
			$elm$core$String$toUpper(value))) : $elm$core$Maybe$Nothing;
};
var $ohanhi$keyboard$Keyboard$anyKeyUpper = $ohanhi$keyboard$Keyboard$anyKeyWith($ohanhi$keyboard$Keyboard$characterKeyUpper);
var $ohanhi$keyboard$Keyboard$RawKey = $elm$core$Basics$identity;
var $ohanhi$keyboard$Keyboard$eventKeyDecoder = A2(
	$elm$json$Json$Decode$field,
	'key',
	A2($elm$json$Json$Decode$map, $elm$core$Basics$identity, $elm$json$Json$Decode$string));
var $robinheghan$keyboard_events$Keyboard$Events$messageSelector = function (decisionMap) {
	var helper = function (maybeKey) {
		if (maybeKey.$ === 1) {
			return $elm$json$Json$Decode$fail('No key we\'re interested in');
		} else {
			var key = maybeKey.a;
			return A2(
				$elm$core$Maybe$withDefault,
				$elm$json$Json$Decode$fail('No key we\'re interested in'),
				A2(
					$elm$core$Maybe$map,
					$elm$json$Json$Decode$succeed,
					A2(
						$elm$core$Maybe$map,
						$elm$core$Tuple$second,
						$elm$core$List$head(
							A2(
								$elm$core$List$filter,
								function (_v1) {
									var k = _v1.a;
									return _Utils_eq(k, key);
								},
								decisionMap)))));
		}
	};
	return A2(
		$elm$json$Json$Decode$andThen,
		helper,
		A2($elm$json$Json$Decode$map, $ohanhi$keyboard$Keyboard$anyKeyUpper, $ohanhi$keyboard$Keyboard$eventKeyDecoder));
};
var $robinheghan$keyboard_events$Keyboard$Events$on = F2(
	function (event, decisionMap) {
		return A2(
			$elm$html$Html$Events$on,
			$robinheghan$keyboard_events$Keyboard$Events$eventToString(event),
			$robinheghan$keyboard_events$Keyboard$Events$messageSelector(decisionMap));
	});
var $elm$html$Html$Events$onBlur = function (msg) {
	return A2(
		$elm$html$Html$Events$on,
		'blur',
		$elm$json$Json$Decode$succeed(msg));
};
var $elm$html$Html$Events$onFocus = function (msg) {
	return A2(
		$elm$html$Html$Events$on,
		'focus',
		$elm$json$Json$Decode$succeed(msg));
};
var $elm$html$Html$Events$alwaysStop = function (x) {
	return _Utils_Tuple2(x, true);
};
var $elm$virtual_dom$VirtualDom$MayStopPropagation = function (a) {
	return {$: 1, a: a};
};
var $elm$html$Html$Events$stopPropagationOn = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$MayStopPropagation(decoder));
	});
var $elm$json$Json$Decode$at = F2(
	function (fields, decoder) {
		return A3($elm$core$List$foldr, $elm$json$Json$Decode$field, decoder, fields);
	});
var $elm$html$Html$Events$targetValue = A2(
	$elm$json$Json$Decode$at,
	_List_fromArray(
		['target', 'value']),
	$elm$json$Json$Decode$string);
var $elm$html$Html$Events$onInput = function (tagger) {
	return A2(
		$elm$html$Html$Events$stopPropagationOn,
		'input',
		A2(
			$elm$json$Json$Decode$map,
			$elm$html$Html$Events$alwaysStop,
			A2($elm$json$Json$Decode$map, tagger, $elm$html$Html$Events$targetValue)));
};
var $elm$html$Html$Events$onMouseDown = function (msg) {
	return A2(
		$elm$html$Html$Events$on,
		'mousedown',
		$elm$json$Json$Decode$succeed(msg));
};
var $author$project$Events$onMouseDownStopPropagation = function (message) {
	return A2(
		$elm$html$Html$Events$custom,
		'mousedown',
		$elm$json$Json$Decode$succeed(
			{X: message, aa: false, ab: true}));
};
var $elm$html$Html$Events$onMouseUp = function (msg) {
	return A2(
		$elm$html$Html$Events$on,
		'mouseup',
		$elm$json$Json$Decode$succeed(msg));
};
var $author$project$Events$onMouseUpStopPropagation = function (message) {
	return A2(
		$elm$html$Html$Events$custom,
		'mouseup',
		$elm$json$Json$Decode$succeed(
			{X: message, aa: false, ab: true}));
};
var $author$project$MuchSelect$DeselectOptionInternal = function (a) {
	return {$: 20, a: a};
};
var $author$project$MuchSelect$ToggleSelectedValueHighlight = function (a) {
	return {$: 39, a: a};
};
var $author$project$OptionLabel$getLabelString = function (optionLabel) {
	var string = optionLabel.a;
	return string;
};
var $author$project$OptionPart$toSelectedHighlightedValueAttribute = function (optionPart) {
	var string = optionPart;
	if (string === '') {
		return A2($elm$html$Html$Attributes$attribute, 'part', 'selected-value highlighted');
	} else {
		return A2($elm$html$Html$Attributes$attribute, 'part', 'selected-value highlighted ' + string);
	}
};
var $author$project$OptionPart$toSelectedValueAttribute = function (optionPart) {
	var string = optionPart;
	if (string === '') {
		return A2($elm$html$Html$Attributes$attribute, 'part', 'selected-value');
	} else {
		return A2($elm$html$Html$Attributes$attribute, 'part', 'selected-value ' + string);
	}
};
var $author$project$FancyOption$valueLabelHtml = F3(
	function (toggleSelectedMsg, labelText, optionValue) {
		return A2(
			$elm$html$Html$span,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('value-label'),
					$author$project$Events$mouseUpPreventDefault(
					toggleSelectedMsg(optionValue))
				]),
			_List_fromArray(
				[
					$elm$html$Html$text(labelText)
				]));
	});
var $author$project$FancyOption$toMultiSelectValueHtml = F4(
	function (toggleSelectedMsg, deselectOptionInternal, enableSingleItemRemoval, fancyOption) {
		var removalHtml = function (optionValue) {
			if (!enableSingleItemRemoval) {
				return A2(
					$elm$html$Html$span,
					_List_fromArray(
						[
							$author$project$Events$mouseUpPreventDefault(
							deselectOptionInternal(optionValue)),
							$elm$html$Html$Attributes$class('remove-option')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('')
						]));
			} else {
				return $elm$html$Html$text('');
			}
		};
		switch (fancyOption.$) {
			case 0:
				var optionDisplay = fancyOption.a;
				var optionLabel = fancyOption.b;
				var optionValue = fancyOption.c;
				switch (optionDisplay.$) {
					case 0:
						return $elm_community$html_extra$Html$Extra$nothing;
					case 1:
						return $elm_community$html_extra$Html$Extra$nothing;
					case 2:
						return A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('value'),
									$author$project$OptionPart$toSelectedValueAttribute(
									$author$project$FancyOption$getOptionPart(fancyOption))
								]),
							_List_fromArray(
								[
									A3(
									$author$project$FancyOption$valueLabelHtml,
									toggleSelectedMsg,
									$author$project$OptionLabel$getLabelString(optionLabel),
									optionValue),
									removalHtml(optionValue)
								]));
					case 3:
						return $elm_community$html_extra$Html$Extra$nothing;
					case 4:
						return $elm_community$html_extra$Html$Extra$nothing;
					case 5:
						return A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$classList(
									_List_fromArray(
										[
											_Utils_Tuple2('value', true),
											_Utils_Tuple2('highlighted-value', true)
										])),
									$author$project$OptionPart$toSelectedHighlightedValueAttribute(
									$author$project$FancyOption$getOptionPart(fancyOption))
								]),
							_List_fromArray(
								[
									A3(
									$author$project$FancyOption$valueLabelHtml,
									toggleSelectedMsg,
									$author$project$OptionLabel$getLabelString(optionLabel),
									optionValue),
									removalHtml(optionValue)
								]));
					case 6:
						return $elm_community$html_extra$Html$Extra$nothing;
					case 7:
						return $elm_community$html_extra$Html$Extra$nothing;
					default:
						return $elm_community$html_extra$Html$Extra$nothing;
				}
			case 1:
				var optionDisplay = fancyOption.a;
				var optionLabel = fancyOption.b;
				var optionValue = fancyOption.c;
				switch (optionDisplay.$) {
					case 0:
						return $elm_community$html_extra$Html$Extra$nothing;
					case 1:
						return $elm_community$html_extra$Html$Extra$nothing;
					case 2:
						return A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('value'),
									$author$project$OptionPart$toSelectedValueAttribute(
									$author$project$FancyOption$getOptionPart(fancyOption))
								]),
							_List_fromArray(
								[
									A3(
									$author$project$FancyOption$valueLabelHtml,
									toggleSelectedMsg,
									$author$project$OptionLabel$getLabelString(optionLabel),
									optionValue),
									removalHtml(optionValue)
								]));
					case 3:
						return $elm_community$html_extra$Html$Extra$nothing;
					case 4:
						return $elm_community$html_extra$Html$Extra$nothing;
					case 5:
						return A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$classList(
									_List_fromArray(
										[
											_Utils_Tuple2('value', true),
											_Utils_Tuple2('highlighted-value', true)
										])),
									$author$project$OptionPart$toSelectedHighlightedValueAttribute(
									$author$project$FancyOption$getOptionPart(fancyOption))
								]),
							_List_fromArray(
								[
									A3(
									$author$project$FancyOption$valueLabelHtml,
									toggleSelectedMsg,
									$author$project$OptionLabel$getLabelString(optionLabel),
									optionValue),
									removalHtml(optionValue)
								]));
					case 6:
						return $elm_community$html_extra$Html$Extra$nothing;
					case 7:
						return $elm_community$html_extra$Html$Extra$nothing;
					default:
						return $elm_community$html_extra$Html$Extra$nothing;
				}
			default:
				var optionDisplay = fancyOption.a;
				var optionLabel = fancyOption.b;
				switch (optionDisplay.$) {
					case 0:
						return $elm_community$html_extra$Html$Extra$nothing;
					case 1:
						return $elm_community$html_extra$Html$Extra$nothing;
					case 2:
						return A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('value'),
									$author$project$OptionPart$toSelectedValueAttribute(
									$author$project$FancyOption$getOptionPart(fancyOption))
								]),
							_List_fromArray(
								[
									$elm$html$Html$text(
									$author$project$OptionLabel$getLabelString(optionLabel))
								]));
					case 3:
						return $elm_community$html_extra$Html$Extra$nothing;
					case 4:
						return $elm_community$html_extra$Html$Extra$nothing;
					case 5:
						return $elm_community$html_extra$Html$Extra$nothing;
					case 6:
						return $elm_community$html_extra$Html$Extra$nothing;
					case 7:
						return $elm_community$html_extra$Html$Extra$nothing;
					default:
						return $elm_community$html_extra$Html$Extra$nothing;
				}
		}
	});
var $author$project$SlottedOption$valueLabelHtml = F3(
	function (toggleSelectedMsg, labelText, optionValue) {
		return A2(
			$elm$html$Html$span,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('value-label'),
					$author$project$Events$mouseUpPreventDefault(
					toggleSelectedMsg(optionValue))
				]),
			_List_fromArray(
				[
					$elm$html$Html$text(labelText)
				]));
	});
var $author$project$SlottedOption$toValueHtml = F4(
	function (toggleSelectedMsg, deselectOptionInternal, enableSingleItemRemoval, option) {
		var removalHtml = function (optionValue) {
			if (!enableSingleItemRemoval) {
				return A2(
					$elm$html$Html$span,
					_List_fromArray(
						[
							$author$project$Events$mouseUpPreventDefault(
							deselectOptionInternal(optionValue)),
							$elm$html$Html$Attributes$class('remove-option')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('')
						]));
			} else {
				return $elm$html$Html$text('');
			}
		};
		var partAttr = A2($elm$html$Html$Attributes$attribute, 'part', 'value');
		var highlightPartAttr = A2($elm$html$Html$Attributes$attribute, 'part', 'value highlighted-value');
		var optionDisplay = option.a;
		var optionValue = option.b;
		switch (optionDisplay.$) {
			case 0:
				return $elm$html$Html$text('');
			case 1:
				return $elm$html$Html$text('');
			case 2:
				return A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('value'),
							partAttr
						]),
					_List_fromArray(
						[
							A3(
							$author$project$SlottedOption$valueLabelHtml,
							toggleSelectedMsg,
							$author$project$OptionValue$optionValueToString(optionValue),
							optionValue),
							removalHtml(optionValue)
						]));
			case 3:
				return $elm$html$Html$text('');
			case 4:
				return $elm$html$Html$text('');
			case 5:
				return A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$classList(
							_List_fromArray(
								[
									_Utils_Tuple2('value', true),
									_Utils_Tuple2('highlighted-value', true)
								])),
							highlightPartAttr
						]),
					_List_fromArray(
						[
							A3(
							$author$project$SlottedOption$valueLabelHtml,
							toggleSelectedMsg,
							$author$project$OptionValue$optionValueToString(optionValue),
							optionValue),
							removalHtml(optionValue)
						]));
			case 6:
				return $elm$html$Html$text('');
			case 7:
				return $elm$html$Html$text('');
			default:
				return $elm$html$Html$text('');
		}
	});
var $author$project$MuchSelect$optionToValueHtml = F2(
	function (enableSingleItemRemoval, option) {
		switch (option.$) {
			case 0:
				var fancyOption = option.a;
				return A4($author$project$FancyOption$toMultiSelectValueHtml, $author$project$MuchSelect$ToggleSelectedValueHighlight, $author$project$MuchSelect$DeselectOptionInternal, enableSingleItemRemoval, fancyOption);
			case 1:
				return $elm$html$Html$text('');
			default:
				var slottedOption = option.a;
				return A4($author$project$SlottedOption$toValueHtml, $author$project$MuchSelect$ToggleSelectedValueHighlight, $author$project$MuchSelect$DeselectOptionInternal, enableSingleItemRemoval, slottedOption);
		}
	});
var $author$project$MuchSelect$optionsToValuesHtml = F2(
	function (options, enableSingleItemRemoval) {
		return A2(
			$author$project$OptionList$andMap,
			A2($elm$html$Html$Lazy$lazy2, $author$project$MuchSelect$optionToValueHtml, enableSingleItemRemoval),
			A2(
				$author$project$OptionList$sortBy,
				$author$project$Option$getOptionSelectedIndex,
				$author$project$OptionList$selectedOptions(options)));
	});
var $elm$html$Html$Attributes$placeholder = $elm$html$Html$Attributes$stringProperty('placeholder');
var $author$project$MuchSelect$AddMultiSelectValue = function (a) {
	return {$: 41, a: a};
};
var $author$project$MuchSelect$ClearAllSelectedOptions = {$: 38};
var $author$project$MuchSelect$RemoveMultiSelectValue = function (a) {
	return {$: 42, a: a};
};
var $elm$html$Html$button = _VirtualDom_node('button');
var $author$project$MuchSelect$defaultAddButton = A2(
	$elm$html$Html$button,
	_List_Nil,
	_List_fromArray(
		[
			$elm$html$Html$text('+')
		]));
var $author$project$MuchSelect$addButtonSlot = function (index) {
	return A3(
		$elm$html$Html$node,
		'slot',
		_List_fromArray(
			[
				$elm$html$Html$Attributes$name(
				'add-value-button-' + $elm$core$String$fromInt(index))
			]),
		_List_fromArray(
			[$author$project$MuchSelect$defaultAddButton]));
};
var $author$project$MuchSelect$defaultLoadingIndicator = A2(
	$elm$html$Html$div,
	_List_fromArray(
		[
			$elm$html$Html$Attributes$class('default-loading-indicator')
		]),
	_List_Nil);
var $author$project$MuchSelect$BringInputOutOfFocus = {$: 2};
var $author$project$Events$onMouseDownStopPropagationAndPreventDefault = function (message) {
	return A2(
		$elm$html$Html$Events$custom,
		'mousedown',
		$elm$json$Json$Decode$succeed(
			{X: message, aa: true, ab: true}));
};
var $author$project$Events$onMouseUpStopPropagationAndPreventDefault = function (message) {
	return A2(
		$elm$html$Html$Events$custom,
		'mouseup',
		$elm$json$Json$Decode$succeed(
			{X: message, aa: true, ab: true}));
};
var $author$project$MuchSelect$dropdownIndicator = F2(
	function (interactionState, transitioning) {
		if (interactionState === 2) {
			return $elm$html$Html$text('');
		} else {
			var partAttr = function () {
				switch (interactionState) {
					case 0:
						return A2($elm$html$Html$Attributes$attribute, 'part', 'dropdown-indicator down');
					case 1:
						return A2($elm$html$Html$Attributes$attribute, 'part', 'dropdown-indicator up');
					default:
						return A2($elm$html$Html$Attributes$attribute, 'part', 'dropdown-indicator');
				}
			}();
			var classes = function () {
				switch (interactionState) {
					case 0:
						return _List_fromArray(
							[
								_Utils_Tuple2('down', true)
							]);
					case 1:
						return _List_fromArray(
							[
								_Utils_Tuple2('up', true)
							]);
					default:
						return _List_Nil;
				}
			}();
			var action = function () {
				if (!transitioning) {
					return $author$project$MuchSelect$NoOp;
				} else {
					return (!interactionState) ? $author$project$MuchSelect$BringInputOutOfFocus : $author$project$MuchSelect$BringInputInFocus;
				}
			}();
			return A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$id('dropdown-indicator'),
						partAttr,
						$elm$html$Html$Attributes$classList(classes),
						$author$project$Events$onMouseDownStopPropagationAndPreventDefault(action),
						$author$project$Events$onMouseUpStopPropagationAndPreventDefault($author$project$MuchSelect$NoOp)
					]),
				_List_fromArray(
					[
						$elm$html$Html$text('❯')
					]));
		}
	});
var $elm$html$Html$Events$onClick = function (msg) {
	return A2(
		$elm$html$Html$Events$on,
		'click',
		$elm$json$Json$Decode$succeed(msg));
};
var $author$project$MuchSelect$defaultRemoveButton = A2(
	$elm$html$Html$button,
	_List_Nil,
	_List_fromArray(
		[
			$elm$html$Html$text('✘')
		]));
var $author$project$MuchSelect$remoteButtonSlot = function (index) {
	return A3(
		$elm$html$Html$node,
		'slot',
		_List_fromArray(
			[
				$elm$html$Html$Attributes$name(
				'remove-value-button-' + $elm$core$String$fromInt(index))
			]),
		_List_fromArray(
			[$author$project$MuchSelect$defaultRemoveButton]));
};
var $author$project$MuchSelect$rightSlotHtml = F4(
	function (rightSlot, interactionState, isDisabled, selectedIndex) {
		switch (rightSlot.$) {
			case 0:
				return $elm$html$Html$text('');
			case 1:
				return A3(
					$elm$html$Html$node,
					'slot',
					_List_fromArray(
						[
							$elm$html$Html$Attributes$name('loading-indicator')
						]),
					_List_fromArray(
						[$author$project$MuchSelect$defaultLoadingIndicator]));
			case 2:
				var transitioning = rightSlot.a;
				return A2($author$project$MuchSelect$dropdownIndicator, interactionState, transitioning);
			case 3:
				return isDisabled ? $elm$html$Html$text('') : A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$id('clear-button-wrapper'),
							A2($elm$html$Html$Attributes$attribute, 'part', 'clear-button-wrapper'),
							$author$project$Events$onClickPreventDefaultAndStopPropagation($author$project$MuchSelect$ClearAllSelectedOptions)
						]),
					_List_fromArray(
						[
							A3(
							$elm$html$Html$node,
							'slot',
							_List_fromArray(
								[
									$elm$html$Html$Attributes$name('clear-button')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('✕')
								]))
						]));
			case 4:
				return isDisabled ? $elm$html$Html$text('') : A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('add-remove-buttons')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('add-button-wrapper'),
									$elm$html$Html$Events$onClick(
									$author$project$MuchSelect$AddMultiSelectValue(selectedIndex))
								]),
							_List_fromArray(
								[
									$author$project$MuchSelect$addButtonSlot(selectedIndex)
								]))
						]));
			default:
				return isDisabled ? $elm$html$Html$text('') : A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('add-remove-buttons')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('add-button-wrapper'),
									$elm$html$Html$Events$onClick(
									$author$project$MuchSelect$AddMultiSelectValue(selectedIndex))
								]),
							_List_fromArray(
								[
									$author$project$MuchSelect$addButtonSlot(selectedIndex)
								])),
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('remove-button-wrapper'),
									$elm$html$Html$Events$onClick(
									$author$project$MuchSelect$RemoveMultiSelectValue(selectedIndex))
								]),
							_List_fromArray(
								[
									$author$project$MuchSelect$remoteButtonSlot(selectedIndex)
								]))
						]));
		}
	});
var $elm$html$Html$Attributes$tabindex = function (n) {
	return A2(
		_VirtualDom_attribute,
		'tabIndex',
		$elm$core$String$fromInt(n));
};
var $author$project$MuchSelect$tabIndexAttribute = function (disabled) {
	return disabled ? A2($elm$html$Html$Attributes$style, '', '') : $elm$html$Html$Attributes$tabindex(0);
};
var $elm$html$Html$Attributes$type_ = $elm$html$Html$Attributes$stringProperty('type');
var $author$project$MuchSelect$valueCasingClassList = F3(
	function (selectionConfig, hasOptionSelected, hasAnError) {
		var selectionModeClass = function () {
			var _v3 = $author$project$SelectionMode$getSelectionMode(selectionConfig);
			if (!_v3) {
				return _Utils_Tuple2('single', true);
			} else {
				return _Utils_Tuple2('multi', true);
			}
		}();
		var outputStyleClass = function () {
			var _v2 = $author$project$SelectionMode$getOutputStyle(selectionConfig);
			if (!_v2) {
				return _Utils_Tuple2('output-style-custom-html', true);
			} else {
				return _Utils_Tuple2('output-style-datalist', true);
			}
		}();
		var isFocused_ = $author$project$SelectionMode$isFocused(selectionConfig);
		var showPlaceholder = function () {
			var _v1 = $author$project$SelectionMode$getOutputStyle(selectionConfig);
			if (!_v1) {
				return (!hasOptionSelected) && (!isFocused_);
			} else {
				return false;
			}
		}();
		var allowsCustomOptions = function () {
			var _v0 = $author$project$SelectionMode$getCustomOptions(selectionConfig);
			if (!_v0.$) {
				return true;
			} else {
				return false;
			}
		}();
		return _List_fromArray(
			[
				_Utils_Tuple2('has-option-selected', hasOptionSelected),
				_Utils_Tuple2('no-option-selected', !hasOptionSelected),
				selectionModeClass,
				outputStyleClass,
				_Utils_Tuple2(
				'disabled',
				$author$project$SelectionMode$isDisabled(selectionConfig)),
				_Utils_Tuple2('focused', isFocused_),
				_Utils_Tuple2('not-focused', !isFocused_),
				_Utils_Tuple2('show-placeholder', showPlaceholder),
				_Utils_Tuple2('allows-custom-options', allowsCustomOptions),
				_Utils_Tuple2('error', hasAnError)
			]);
	});
var $author$project$MuchSelect$valueCasingPartsAttribute = F3(
	function (selectionConfig, hasError, hasPendingValidation) {
		var selectionModeStr = function () {
			var _v2 = $author$project$SelectionMode$getSelectionMode(selectionConfig);
			if (!_v2) {
				return 'single';
			} else {
				return 'multi';
			}
		}();
		var outputStyleStr = function () {
			var _v1 = $author$project$SelectionMode$getOutputStyle(selectionConfig);
			if (!_v1) {
				return 'output-style-custom-html';
			} else {
				return 'output-style-datalist';
			}
		}();
		var interactionStateStr = function () {
			var _v0 = $author$project$SelectionMode$getInteractionState(selectionConfig);
			switch (_v0) {
				case 0:
					return 'focused';
				case 1:
					return 'unfocused';
				default:
					return 'disabled';
			}
		}();
		var hasPendingValidationStr = hasPendingValidation ? 'pending-validation' : '';
		var hasErrorStr = hasError ? 'error' : '';
		return A2(
			$elm$html$Html$Attributes$attribute,
			'part',
			A2(
				$elm$core$String$join,
				' ',
				_List_fromArray(
					['value-casing', outputStyleStr, selectionModeStr, interactionStateStr, hasErrorStr, hasPendingValidationStr])));
	});
var $author$project$MuchSelect$multiSelectViewCustomHtml = F4(
	function (selectionConfig, options, searchString, rightSlot) {
		var hasPendingValidation = $author$project$OptionList$hasAnyPendingValidation(options);
		var hasOptionSelected = $author$project$OptionList$hasSelectedOption(options);
		var showPlaceholder = (!hasOptionSelected) && (!$author$project$SelectionMode$isFocused(selectionConfig));
		var placeholderAttribute = showPlaceholder ? $elm$html$Html$Attributes$placeholder(
			$author$project$SelectionMode$getPlaceholderString(selectionConfig)) : $elm$html$Html$Attributes$classList(_List_Nil);
		var inputFilter = A2(
			$elm$html$Html$input,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$type_('text'),
					$elm$html$Html$Events$onBlur($author$project$MuchSelect$InputBlur),
					$elm$html$Html$Events$onFocus($author$project$MuchSelect$InputFocus),
					$elm$html$Html$Events$onInput($author$project$MuchSelect$UpdateSearchString),
					$author$project$Events$onMouseDownStopPropagation($author$project$MuchSelect$NoOp),
					$author$project$Events$onMouseUpStopPropagation($author$project$MuchSelect$NoOp),
					$elm$html$Html$Attributes$value(
					$author$project$SearchString$toString(searchString)),
					placeholderAttribute,
					$elm$html$Html$Attributes$id('input-filter'),
					A2($elm$html$Html$Attributes$attribute, 'part', 'input-filter'),
					$elm$html$Html$Attributes$disabled(
					$author$project$SelectionMode$isDisabled(selectionConfig)),
					A2(
					$robinheghan$keyboard_events$Keyboard$Events$on,
					0,
					_List_fromArray(
						[
							_Utils_Tuple2($ohanhi$keyboard$Keyboard$Enter, $author$project$MuchSelect$SelectHighlightedOption),
							_Utils_Tuple2($ohanhi$keyboard$Keyboard$Escape, $author$project$MuchSelect$EscapeKeyInInputFilter),
							_Utils_Tuple2($ohanhi$keyboard$Keyboard$ArrowUp, $author$project$MuchSelect$MoveHighlightedOptionUp),
							_Utils_Tuple2($ohanhi$keyboard$Keyboard$ArrowDown, $author$project$MuchSelect$MoveHighlightedOptionDown)
						]))
				]),
			_List_Nil);
		var hasErrors = $author$project$OptionList$hasAnyValidationErrors(options);
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$id('value-casing'),
					A3($author$project$MuchSelect$valueCasingPartsAttribute, selectionConfig, hasErrors, hasPendingValidation),
					$elm$html$Html$Events$onMouseDown($author$project$MuchSelect$NoOp),
					$elm$html$Html$Events$onMouseUp($author$project$MuchSelect$BringInputInFocus),
					$elm$html$Html$Events$onFocus($author$project$MuchSelect$BringInputInFocus),
					A2(
					$robinheghan$keyboard_events$Keyboard$Events$on,
					0,
					_List_fromArray(
						[
							_Utils_Tuple2($ohanhi$keyboard$Keyboard$Delete, $author$project$MuchSelect$DeleteKeydownForMultiSelect),
							_Utils_Tuple2($ohanhi$keyboard$Keyboard$Backspace, $author$project$MuchSelect$DeleteKeydownForMultiSelect)
						])),
					$author$project$MuchSelect$tabIndexAttribute(
					$author$project$SelectionMode$isDisabled(selectionConfig)),
					$elm$html$Html$Attributes$classList(
					A3($author$project$MuchSelect$valueCasingClassList, selectionConfig, hasOptionSelected, false))
				]),
			_Utils_ap(
				A2(
					$author$project$MuchSelect$optionsToValuesHtml,
					options,
					$author$project$SelectionMode$getSingleItemRemoval(selectionConfig)),
				_List_fromArray(
					[
						inputFilter,
						A4(
						$author$project$MuchSelect$rightSlotHtml,
						rightSlot,
						$author$project$SelectionMode$getInteractionState(selectionConfig),
						$author$project$SelectionMode$isDisabled(selectionConfig),
						0)
					])));
	});
var $author$project$OptionList$concatMap = F2(
	function (_function, optionList) {
		return $elm$core$List$concat(
			A2($author$project$OptionList$andMap, _function, optionList));
	});
var $author$project$MuchSelect$UpdateOptionValueValue = F2(
	function (a, b) {
		return {$: 11, a: a, b: b};
	});
var $author$project$OptionDisplay$getErrors = function (optionDisplay) {
	switch (optionDisplay.$) {
		case 0:
			return _List_Nil;
		case 1:
			return _List_Nil;
		case 2:
			return _List_Nil;
		case 4:
			return _List_Nil;
		case 3:
			var validationFailures = optionDisplay.b;
			return validationFailures;
		case 5:
			return _List_Nil;
		case 6:
			return _List_Nil;
		case 8:
			return _List_Nil;
		default:
			return _List_Nil;
	}
};
var $author$project$Option$getOptionValidationErrors = function (option) {
	return $author$project$OptionDisplay$getErrors(
		$author$project$Option$getOptionDisplay(option));
};
var $author$project$SelectionMode$hasPlaceholder = function (selectionConfig) {
	return $author$project$SelectionMode$getPlaceholder(selectionConfig).a;
};
var $elm$html$Html$li = _VirtualDom_node('li');
var $elm$html$Html$Attributes$list = _VirtualDom_attribute('list');
var $elm$html$Html$ul = _VirtualDom_node('ul');
var $author$project$MuchSelect$multiSelectDatasetInputField = F4(
	function (maybeOption, selectionConfig, rightSlot, index) {
		var valueString = function () {
			if (!maybeOption.$) {
				var option = maybeOption.a;
				return $author$project$Option$getOptionValueAsString(option);
			} else {
				return '';
			}
		}();
		var typeAttr = $elm$html$Html$Attributes$type_('text');
		var placeholderAttribute = $author$project$SelectionMode$hasPlaceholder(selectionConfig) ? $elm$html$Html$Attributes$placeholder(
			$author$project$SelectionMode$getPlaceholderString(selectionConfig)) : $elm_community$html_extra$Html$Attributes$Extra$empty;
		var makeValidationErrorMessage = function (validationFailure) {
			var validationReportLevel = validationFailure.a;
			var validationErrorMessage = validationFailure.b;
			if (!validationReportLevel) {
				return $elm$html$Html$text('');
			} else {
				var string = validationErrorMessage;
				return A2(
					$elm$html$Html$li,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text(string)
						]));
			}
		};
		var isOptionInvalid = A2(
			$elm$core$Maybe$withDefault,
			false,
			A2($elm$core$Maybe$map, $author$project$Option$isInvalid, maybeOption));
		var idAttr = $elm$html$Html$Attributes$id(
			'input-value-' + $elm$core$String$fromInt(index));
		var errorIdAttr = $elm$html$Html$Attributes$id(
			'error-input-value-' + $elm$core$String$fromInt(index));
		var errorMessage = isOptionInvalid ? A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					errorIdAttr,
					$elm$html$Html$Attributes$class('error-message')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$ul,
					_List_Nil,
					A2(
						$elm$core$List$map,
						makeValidationErrorMessage,
						A2(
							$elm$core$Maybe$withDefault,
							_List_Nil,
							A2($elm$core$Maybe$map, $author$project$Option$getOptionValidationErrors, maybeOption))))
				])) : $elm$html$Html$text('');
		var classes = _List_fromArray(
			[
				_Utils_Tuple2('input-value', true),
				_Utils_Tuple2('invalid', isOptionInvalid)
			]);
		var ariaLabel = A2($elm$html$Html$Attributes$attribute, 'aria-label', 'much-select-value');
		var inputHtml = $author$project$SelectionMode$isDisabled(selectionConfig) ? A2(
			$elm$html$Html$input,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$disabled(true),
					idAttr,
					ariaLabel,
					A2($elm$html$Html$Attributes$attribute, 'part', 'input-value'),
					placeholderAttribute,
					$elm$html$Html$Attributes$classList(classes),
					$elm$html$Html$Attributes$value(valueString)
				]),
			_List_Nil) : A2(
			$elm$html$Html$input,
			_List_fromArray(
				[
					typeAttr,
					idAttr,
					ariaLabel,
					A2($elm$html$Html$Attributes$attribute, 'part', 'input-value'),
					$elm$html$Html$Attributes$classList(classes),
					$elm$html$Html$Events$onInput(
					$author$project$MuchSelect$UpdateOptionValueValue(index)),
					$elm$html$Html$Events$onBlur($author$project$MuchSelect$InputBlur),
					$elm$html$Html$Attributes$value(valueString),
					placeholderAttribute,
					$elm$html$Html$Attributes$list('datalist-options')
				]),
			_List_Nil);
		return _List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('input-wrapper'),
						A2($elm$html$Html$Attributes$attribute, 'part', 'input-wrapper')
					]),
				_List_fromArray(
					[
						inputHtml,
						A4(
						$author$project$MuchSelect$rightSlotHtml,
						rightSlot,
						$author$project$SelectionMode$getInteractionState(selectionConfig),
						$author$project$SelectionMode$isDisabled(selectionConfig),
						index)
					])),
				errorMessage
			]);
	});
var $author$project$MuchSelect$multiSelectViewDataset = F3(
	function (selectionConfig, options, rightSlot) {
		var selectedOptions = $author$project$OptionList$selectedOptions(options);
		var makeInputs = function (selectedOptions_) {
			var _v0 = $author$project$OptionList$length(selectedOptions_);
			if (!_v0) {
				return A4($author$project$MuchSelect$multiSelectDatasetInputField, $elm$core$Maybe$Nothing, selectionConfig, rightSlot, 0);
			} else {
				return A2(
					$author$project$OptionList$concatMap,
					function (selectedOption) {
						return A4(
							$author$project$MuchSelect$multiSelectDatasetInputField,
							$elm$core$Maybe$Just(selectedOption),
							selectionConfig,
							rightSlot,
							$author$project$Option$getOptionSelectedIndex(selectedOption));
					},
					selectedOptions_);
			}
		};
		var hasPendingValidation = $author$project$OptionList$hasAnyPendingValidation(selectedOptions);
		var hasOptionSelected = $author$project$OptionList$hasSelectedOption(options);
		var hasAnError = !$author$project$OptionList$allOptionsAreValid(selectedOptions);
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$id('value-casing'),
					A3($author$project$MuchSelect$valueCasingPartsAttribute, selectionConfig, hasAnError, hasPendingValidation),
					$elm$html$Html$Attributes$classList(
					A3($author$project$MuchSelect$valueCasingClassList, selectionConfig, hasOptionSelected, hasAnError))
				]),
			makeInputs(selectedOptions));
	});
var $author$project$MuchSelect$multiSelectView = F4(
	function (selectionMode, options, searchString, rightSlot) {
		var _v0 = $author$project$SelectionMode$getOutputStyle(selectionMode);
		if (!_v0) {
			return A4($author$project$MuchSelect$multiSelectViewCustomHtml, selectionMode, options, searchString, rightSlot);
		} else {
			return A3($author$project$MuchSelect$multiSelectViewDataset, selectionMode, options, rightSlot);
		}
	});
var $elm_community$html_extra$Html$Attributes$Extra$attributeIf = F2(
	function (condition, attr) {
		return condition ? attr : $elm_community$html_extra$Html$Attributes$Extra$empty;
	});
var $author$project$MuchSelect$DeleteInputForSingleSelect = {$: 33};
var $robinheghan$keyboard_events$Keyboard$Events$customPerKey = F2(
	function (event, decisionMap) {
		return A2(
			$elm$html$Html$Events$custom,
			$robinheghan$keyboard_events$Keyboard$Events$eventToString(event),
			$robinheghan$keyboard_events$Keyboard$Events$messageSelector(decisionMap));
	});
var $elm$html$Html$Attributes$maxlength = function (n) {
	return A2(
		_VirtualDom_attribute,
		'maxlength',
		$elm$core$String$fromInt(n));
};
var $author$project$MuchSelect$singleSelectCustomHtmlInputField = F5(
	function (searchString, isDisabled, focused, placeholderTuple, hasSelectedOption) {
		var typeAttr = $elm$html$Html$Attributes$type_('text');
		var showPlaceholder = (!hasSelectedOption) && ((!focused) && placeholderTuple.a);
		var placeholderAttribute = showPlaceholder ? $elm$html$Html$Attributes$placeholder(placeholderTuple.b) : A2($elm$html$Html$Attributes$style, '', '');
		var partAttr = A2($elm$html$Html$Attributes$attribute, 'part', 'input-filter');
		var onFocusAttr = $elm$html$Html$Events$onFocus($author$project$MuchSelect$InputFocus);
		var onBlurAttr = $elm$html$Html$Events$onBlur($author$project$MuchSelect$InputBlur);
		var keyboardEvents = A2(
			$robinheghan$keyboard_events$Keyboard$Events$customPerKey,
			0,
			_List_fromArray(
				[
					_Utils_Tuple2(
					$ohanhi$keyboard$Keyboard$Enter,
					{X: $author$project$MuchSelect$SelectHighlightedOption, aa: false, ab: false}),
					_Utils_Tuple2(
					$ohanhi$keyboard$Keyboard$Backspace,
					{X: $author$project$MuchSelect$DeleteInputForSingleSelect, aa: false, ab: false}),
					_Utils_Tuple2(
					$ohanhi$keyboard$Keyboard$Delete,
					{X: $author$project$MuchSelect$DeleteInputForSingleSelect, aa: false, ab: false}),
					_Utils_Tuple2(
					$ohanhi$keyboard$Keyboard$Escape,
					{X: $author$project$MuchSelect$EscapeKeyInInputFilter, aa: false, ab: false}),
					_Utils_Tuple2(
					$ohanhi$keyboard$Keyboard$ArrowUp,
					{X: $author$project$MuchSelect$MoveHighlightedOptionUp, aa: true, ab: false}),
					_Utils_Tuple2(
					$ohanhi$keyboard$Keyboard$ArrowDown,
					{X: $author$project$MuchSelect$MoveHighlightedOptionDown, aa: true, ab: false})
				]));
		var idAttr = $elm$html$Html$Attributes$id('input-filter');
		return isDisabled ? A2(
			$elm$html$Html$input,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$disabled(true),
					idAttr,
					partAttr,
					placeholderAttribute
				]),
			_List_Nil) : (hasSelectedOption ? A2(
			$elm$html$Html$input,
			_List_fromArray(
				[
					typeAttr,
					idAttr,
					partAttr,
					onBlurAttr,
					onFocusAttr,
					$elm$html$Html$Attributes$value(''),
					$elm$html$Html$Attributes$maxlength(0),
					placeholderAttribute,
					keyboardEvents
				]),
			_List_Nil) : A2(
			$elm$html$Html$input,
			_List_fromArray(
				[
					typeAttr,
					idAttr,
					partAttr,
					onBlurAttr,
					onFocusAttr,
					$author$project$Events$onMouseDownStopPropagation($author$project$MuchSelect$NoOp),
					$author$project$Events$onMouseUpStopPropagation($author$project$MuchSelect$NoOp),
					$elm$html$Html$Events$onInput($author$project$MuchSelect$UpdateSearchString),
					$elm$html$Html$Attributes$value(
					$author$project$SearchString$toString(searchString)),
					placeholderAttribute,
					keyboardEvents
				]),
			_List_Nil));
	});
var $author$project$FancyOption$toSingleSelectValueHtml = function (option) {
	return A2(
		$elm$html$Html$span,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$id('selected-value'),
				$author$project$OptionPart$toSelectedValueAttribute(
				$author$project$FancyOption$getOptionPart(option))
			]),
		_List_fromArray(
			[
				$elm$html$Html$text(
				$author$project$OptionLabel$optionLabelToString(
					$author$project$FancyOption$getOptionLabel(option)))
			]));
};
var $author$project$Option$singleSelectViewCustomHtmlValueHtml = function (option) {
	switch (option.$) {
		case 0:
			var fancyOption = option.a;
			return $author$project$FancyOption$toSingleSelectValueHtml(fancyOption);
		case 1:
			return $elm_community$html_extra$Html$Extra$nothing;
		default:
			return $elm_community$html_extra$Html$Extra$nothing;
	}
};
var $author$project$MuchSelect$singleSelectViewCustomHtmlValue = function (selectedOption) {
	return $author$project$Option$singleSelectViewCustomHtmlValueHtml(selectedOption);
};
var $author$project$FancyOption$toSingleSelectValueNoValueSelected = A2(
	$elm$html$Html$span,
	_List_fromArray(
		[
			$elm$html$Html$Attributes$id('selected-value'),
			A2($elm$html$Html$Attributes$attribute, 'part', 'selected-value')
		]),
	_List_fromArray(
		[
			$elm$html$Html$text('')
		]));
var $author$project$MuchSelect$singleSelectViewCustomHtml = F4(
	function (selectionConfig, options, searchString, rightSlot) {
		var hasPendingValidation = $author$project$OptionList$hasAnyPendingValidation(options);
		var hasOptionSelected = $author$project$OptionList$hasSelectedOption(options);
		var hasErrors = $author$project$OptionList$hasAnyValidationErrors(options);
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$id('value-casing'),
					A3($author$project$MuchSelect$valueCasingPartsAttribute, selectionConfig, hasErrors, hasPendingValidation),
					A2(
					$elm_community$html_extra$Html$Attributes$Extra$attributeIf,
					!$author$project$SelectionMode$isFocused(selectionConfig),
					$elm$html$Html$Events$onMouseDown($author$project$MuchSelect$NoOp)),
					A2(
					$elm_community$html_extra$Html$Attributes$Extra$attributeIf,
					(!$author$project$SelectionMode$isFocused(selectionConfig)) && (!$author$project$SelectionMode$isDisabled(selectionConfig)),
					$elm$html$Html$Events$onMouseUp($author$project$MuchSelect$BringInputInFocus)),
					A2(
					$elm_community$html_extra$Html$Attributes$Extra$attributeIf,
					(!$author$project$SelectionMode$isFocused(selectionConfig)) && (!$author$project$SelectionMode$isDisabled(selectionConfig)),
					$elm$html$Html$Events$onFocus($author$project$MuchSelect$BringInputInFocus)),
					$author$project$MuchSelect$tabIndexAttribute(
					$author$project$SelectionMode$isDisabled(selectionConfig)),
					$elm$html$Html$Attributes$classList(
					A3($author$project$MuchSelect$valueCasingClassList, selectionConfig, hasOptionSelected, false))
				]),
			_List_fromArray(
				[
					function () {
					var _v0 = $author$project$OptionList$head(
						$author$project$OptionList$selectedOptions(options));
					if (!_v0.$) {
						var selectedOption = _v0.a;
						return $author$project$MuchSelect$singleSelectViewCustomHtmlValue(selectedOption);
					} else {
						switch (options.$) {
							case 0:
								return $author$project$FancyOption$toSingleSelectValueNoValueSelected;
							case 1:
								return $elm_community$html_extra$Html$Extra$nothing;
							default:
								return $elm_community$html_extra$Html$Extra$nothing;
						}
					}
				}(),
					A5(
					$author$project$MuchSelect$singleSelectCustomHtmlInputField,
					searchString,
					$author$project$SelectionMode$isDisabled(selectionConfig),
					$author$project$SelectionMode$isFocused(selectionConfig),
					$author$project$SelectionMode$getPlaceholder(selectionConfig),
					hasOptionSelected),
					function () {
					switch (rightSlot.$) {
						case 0:
							return $elm$html$Html$text('');
						case 1:
							return A3(
								$elm$html$Html$node,
								'slot',
								_List_fromArray(
									[
										$elm$html$Html$Attributes$name('loading-indicator')
									]),
								_List_fromArray(
									[$author$project$MuchSelect$defaultLoadingIndicator]));
						case 2:
							var transitioning = rightSlot.a;
							return A2(
								$author$project$MuchSelect$dropdownIndicator,
								$author$project$SelectionMode$getInteractionState(selectionConfig),
								transitioning);
						case 3:
							return A3(
								$elm$html$Html$node,
								'slot',
								_List_fromArray(
									[
										$elm$html$Html$Attributes$name('clear-button')
									]),
								_List_Nil);
						case 4:
							return $elm$html$Html$text('');
						default:
							return $elm$html$Html$text('');
					}
				}()
				]));
	});
var $author$project$MuchSelect$singleSelectDatasetInputField = F3(
	function (maybeOption, selectionMode, hasSelectedOption) {
		var valueString = function () {
			if (!maybeOption.$) {
				var option = maybeOption.a;
				return $author$project$Option$getOptionValueAsString(option);
			} else {
				return '';
			}
		}();
		var typeAttr = $elm$html$Html$Attributes$type_('text');
		var showPlaceholder = (!hasSelectedOption) && (!$author$project$SelectionMode$isFocused(selectionMode));
		var placeholderAttribute = showPlaceholder ? $elm$html$Html$Attributes$placeholder(
			$author$project$SelectionMode$getPlaceholderString(selectionMode)) : $elm_community$html_extra$Html$Attributes$Extra$empty;
		var partAttr = A2($elm$html$Html$Attributes$attribute, 'part', 'input-value');
		var onFocusAttr = $elm$html$Html$Events$onFocus($author$project$MuchSelect$InputFocus);
		var onBlurAttr = $elm$html$Html$Events$onBlur($author$project$MuchSelect$InputBlur);
		var idAttr = $elm$html$Html$Attributes$id('input-value');
		var ariaLabel = A2($elm$html$Html$Attributes$attribute, 'aria-label', 'much-select-value');
		return $author$project$SelectionMode$isDisabled(selectionMode) ? A2(
			$elm$html$Html$input,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$disabled(true),
					idAttr,
					ariaLabel,
					partAttr,
					placeholderAttribute,
					$elm$html$Html$Attributes$value(valueString)
				]),
			_List_Nil) : A2(
			$elm$html$Html$input,
			_List_fromArray(
				[
					typeAttr,
					idAttr,
					ariaLabel,
					partAttr,
					onBlurAttr,
					onFocusAttr,
					$elm$html$Html$Events$onInput(
					$author$project$MuchSelect$UpdateOptionValueValue(0)),
					$elm$html$Html$Attributes$value(valueString),
					placeholderAttribute,
					$elm$html$Html$Attributes$list('datalist-options')
				]),
			_List_Nil);
	});
var $author$project$MuchSelect$singleSelectViewDatalistHtml = F2(
	function (selectionConfig, options) {
		var maybeSelectedOption = $author$project$OptionList$findSelectedOption(options);
		var hasPendingValidation = $author$project$OptionList$hasAnyPendingValidation(options);
		var hasOptionSelected = $author$project$OptionList$hasSelectedOption(options);
		var hasAnError = A2(
			$elm$core$Maybe$withDefault,
			false,
			A2(
				$elm$core$Maybe$map,
				$elm$core$Basics$not,
				A2(
					$elm$core$Maybe$map,
					$elm$core$List$isEmpty,
					A2($elm$core$Maybe$map, $author$project$Option$getOptionValidationErrors, maybeSelectedOption))));
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$id('value-casing'),
					A3($author$project$MuchSelect$valueCasingPartsAttribute, selectionConfig, hasAnError, hasPendingValidation),
					$author$project$MuchSelect$tabIndexAttribute(
					$author$project$SelectionMode$isDisabled(selectionConfig)),
					$elm$html$Html$Attributes$classList(
					A3($author$project$MuchSelect$valueCasingClassList, selectionConfig, hasOptionSelected, hasAnError))
				]),
			_List_fromArray(
				[
					A3($author$project$MuchSelect$singleSelectDatasetInputField, maybeSelectedOption, selectionConfig, hasOptionSelected)
				]));
	});
var $author$project$MuchSelect$singleSelectView = F4(
	function (selectionMode, options, searchString, rightSlot) {
		var _v0 = $author$project$SelectionMode$getOutputStyle(selectionMode);
		if (!_v0) {
			return A4($author$project$MuchSelect$singleSelectViewCustomHtml, selectionMode, options, searchString, rightSlot);
		} else {
			return A2($author$project$MuchSelect$singleSelectViewDatalistHtml, selectionMode, options);
		}
	});
var $author$project$OptionSlot$empty = '';
var $author$project$Option$getSlot = function (option) {
	switch (option.$) {
		case 0:
			return $author$project$OptionSlot$empty;
		case 1:
			return $author$project$OptionSlot$empty;
		default:
			var slottedOption = option.a;
			return $author$project$SlottedOption$getOptionSlot(slottedOption);
	}
};
var $author$project$OptionSlot$toSlotNameAttribute = function (optionSlot) {
	var string = optionSlot;
	return (string === '') ? $elm_community$html_extra$Html$Attributes$Extra$empty : A2($elm$html$Html$Attributes$attribute, 'name', string);
};
var $author$project$DropdownOptions$valueDataAttribute = function (option) {
	return A2(
		$elm$html$Html$Attributes$attribute,
		'data-value',
		$author$project$Option$getOptionValueAsString(option));
};
var $author$project$DropdownOptions$optionToSlottedOptionHtml = F2(
	function (eventHandlers, option) {
		var _v0 = $author$project$Option$getOptionDisplay(option);
		switch (_v0.$) {
			case 0:
				return A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Events$onMouseEnter(
							eventHandlers.dC(
								$author$project$Option$getOptionValue(option))),
							$elm$html$Html$Events$onMouseLeave(
							eventHandlers.dB(
								$author$project$Option$getOptionValue(option))),
							$author$project$Events$mouseDownPreventDefault(
							eventHandlers.dA(
								$author$project$Option$getOptionValue(option))),
							$author$project$Events$mouseUpPreventDefault(
							eventHandlers.dD(
								$author$project$Option$getOptionValue(option))),
							$author$project$Events$onClickPreventDefault(eventHandlers.dH),
							A2($elm$html$Html$Attributes$attribute, 'part', 'dropdown-option'),
							$elm$html$Html$Attributes$class('option'),
							$author$project$DropdownOptions$valueDataAttribute(option)
						]),
					_List_fromArray(
						[
							A3(
							$elm$html$Html$node,
							'slot',
							_List_fromArray(
								[
									$author$project$OptionSlot$toSlotNameAttribute(
									$author$project$Option$getSlot(option))
								]),
							_List_Nil)
						]));
			case 1:
				return $elm$html$Html$text('');
			case 2:
				return A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Events$onMouseEnter(
							eventHandlers.dC(
								$author$project$Option$getOptionValue(option))),
							$elm$html$Html$Events$onMouseLeave(
							eventHandlers.dB(
								$author$project$Option$getOptionValue(option))),
							$author$project$Events$mouseDownPreventDefault(
							eventHandlers.dA(
								$author$project$Option$getOptionValue(option))),
							$author$project$Events$mouseUpPreventDefault(
							eventHandlers.dD(
								$author$project$Option$getOptionValue(option))),
							$author$project$Events$onClickPreventDefault(eventHandlers.dH),
							A2($elm$html$Html$Attributes$attribute, 'part', 'dropdown-option selected'),
							$elm$html$Html$Attributes$class('option selected'),
							$author$project$DropdownOptions$valueDataAttribute(option)
						]),
					_List_fromArray(
						[
							A3(
							$elm$html$Html$node,
							'slot',
							_List_fromArray(
								[
									$author$project$OptionSlot$toSlotNameAttribute(
									$author$project$Option$getSlot(option))
								]),
							_List_Nil)
						]));
			case 3:
				return $elm$html$Html$text('');
			case 4:
				return A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$attribute, 'part', 'dropdown-option disabled pending-validation'),
							$elm$html$Html$Attributes$class('option disabled pending-validation'),
							$author$project$DropdownOptions$valueDataAttribute(option)
						]),
					_List_fromArray(
						[
							A3(
							$elm$html$Html$node,
							'slot',
							_List_fromArray(
								[
									$author$project$OptionSlot$toSlotNameAttribute(
									$author$project$Option$getSlot(option))
								]),
							_List_Nil)
						]));
			case 5:
				return A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Events$onMouseEnter(
							eventHandlers.dC(
								$author$project$Option$getOptionValue(option))),
							$elm$html$Html$Events$onMouseLeave(
							eventHandlers.dB(
								$author$project$Option$getOptionValue(option))),
							$author$project$Events$mouseDownPreventDefault(
							eventHandlers.dA(
								$author$project$Option$getOptionValue(option))),
							$author$project$Events$mouseUpPreventDefault(
							eventHandlers.dD(
								$author$project$Option$getOptionValue(option))),
							$author$project$Events$onClickPreventDefault(eventHandlers.dH),
							A2($elm$html$Html$Attributes$attribute, 'part', 'dropdown-option selected highlighted'),
							$elm$html$Html$Attributes$class('option selected highlighted'),
							$author$project$DropdownOptions$valueDataAttribute(option)
						]),
					_List_fromArray(
						[
							A3(
							$elm$html$Html$node,
							'slot',
							_List_fromArray(
								[
									$author$project$OptionSlot$toSlotNameAttribute(
									$author$project$Option$getSlot(option))
								]),
							_List_Nil)
						]));
			case 6:
				return A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Events$onMouseEnter(
							eventHandlers.dC(
								$author$project$Option$getOptionValue(option))),
							$elm$html$Html$Events$onMouseLeave(
							eventHandlers.dB(
								$author$project$Option$getOptionValue(option))),
							$author$project$Events$mouseDownPreventDefault(
							eventHandlers.dA(
								$author$project$Option$getOptionValue(option))),
							$author$project$Events$mouseUpPreventDefault(
							eventHandlers.dD(
								$author$project$Option$getOptionValue(option))),
							$author$project$Events$onClickPreventDefault(eventHandlers.dH),
							A2($elm$html$Html$Attributes$attribute, 'part', 'dropdown-option selected highlighted'),
							$elm$html$Html$Attributes$class('option highlighted'),
							$author$project$DropdownOptions$valueDataAttribute(option)
						]),
					_List_fromArray(
						[
							A3(
							$elm$html$Html$node,
							'slot',
							_List_fromArray(
								[
									$author$project$OptionSlot$toSlotNameAttribute(
									$author$project$Option$getSlot(option))
								]),
							_List_Nil)
						]));
			case 7:
				return A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Events$onMouseEnter(
							eventHandlers.dC(
								$author$project$Option$getOptionValue(option))),
							$elm$html$Html$Events$onMouseLeave(
							eventHandlers.dB(
								$author$project$Option$getOptionValue(option))),
							$author$project$Events$mouseDownPreventDefault(
							eventHandlers.dA(
								$author$project$Option$getOptionValue(option))),
							$author$project$Events$mouseUpPreventDefault(
							eventHandlers.dD(
								$author$project$Option$getOptionValue(option))),
							$author$project$Events$onClickPreventDefault(eventHandlers.dH),
							A2($elm$html$Html$Attributes$attribute, 'part', 'dropdown-option active highlighted'),
							$elm$html$Html$Attributes$class('option active highlighted'),
							$author$project$DropdownOptions$valueDataAttribute(option)
						]),
					_List_fromArray(
						[
							A3(
							$elm$html$Html$node,
							'slot',
							_List_fromArray(
								[
									$author$project$OptionSlot$toSlotNameAttribute(
									$author$project$Option$getSlot(option))
								]),
							_List_Nil)
						]));
			default:
				return A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$attribute, 'part', 'dropdown-option disabled'),
							$elm$html$Html$Attributes$class('option disabled'),
							$author$project$DropdownOptions$valueDataAttribute(option)
						]),
					_List_fromArray(
						[
							A3(
							$elm$html$Html$node,
							'slot',
							_List_fromArray(
								[
									$author$project$OptionSlot$toSlotNameAttribute(
									$author$project$Option$getSlot(option))
								]),
							_List_Nil)
						]));
		}
	});
var $author$project$DropdownOptions$dropdownOptionsToSlottedOptionsHtml = F2(
	function (eventHandlers, options) {
		return A2(
			$author$project$OptionList$andMap,
			$author$project$DropdownOptions$optionToSlottedOptionHtml(eventHandlers),
			$author$project$DropdownOptions$getOptions(options));
	});
var $author$project$MuchSelect$slottedDropdown = F4(
	function (selectionConfig, options, searchString, _v0) {
		var valueCasingWidth = _v0.a;
		var valueCasingHeight = _v0.b;
		var optionsForTheDropdown = A2($author$project$DropdownOptions$figureOutWhichOptionsToShowInTheDropdown, selectionConfig, options);
		var optionsHtml = $author$project$DropdownOptions$isEmpty(optionsForTheDropdown) ? _List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('option disabled')
					]),
				_List_fromArray(
					[
						A3(
						$elm$html$Html$node,
						'slot',
						_List_fromArray(
							[
								$elm$html$Html$Attributes$name('no-options')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('No available options')
							]))
					]))
			]) : (A3(
			$author$project$OptionSearcher$doesSearchStringFindNothing,
			searchString,
			$author$project$SelectionMode$getSearchStringMinimumLength(selectionConfig),
			optionsForTheDropdown) ? _List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('option disabled')
					]),
				_List_fromArray(
					[
						A3(
						$elm$html$Html$node,
						'slot',
						_List_fromArray(
							[
								$elm$html$Html$Attributes$name('no-filtered-options')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('This filter returned no results.')
							]))
					]))
			]) : A2(
			$author$project$DropdownOptions$dropdownOptionsToSlottedOptionsHtml,
			{dA: $author$project$MuchSelect$DropdownMouseDownOption, dB: $author$project$MuchSelect$DropdownMouseOutOption, dC: $author$project$MuchSelect$DropdownMouseOverOption, dD: $author$project$MuchSelect$DropdownMouseUpOption, dH: $author$project$MuchSelect$NoOp},
			optionsForTheDropdown));
		var dropdownFooterHtml = ($author$project$SelectionMode$showDropdownFooter(selectionConfig) && (_Utils_cmp(
			$author$project$DropdownOptions$length(optionsForTheDropdown),
			$author$project$OptionList$length(options)) < 0)) ? A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$id('dropdown-footer'),
					A2($elm$html$Html$Attributes$attribute, 'part', 'dropdown-footer')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text(
					'showing ' + ($elm$core$String$fromInt(
						$author$project$DropdownOptions$length(optionsForTheDropdown)) + (' of ' + ($elm$core$String$fromInt(
						$author$project$OptionList$length(options)) + ' options'))))
				])) : $elm$html$Html$text('');
		return $author$project$SelectionMode$isDisabled(selectionConfig) ? $elm$html$Html$text('') : A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$id('dropdown'),
					A2($elm$html$Html$Attributes$attribute, 'part', 'dropdown'),
					$elm$html$Html$Attributes$classList(
					_List_fromArray(
						[
							_Utils_Tuple2(
							'showing',
							$author$project$SelectionMode$showDropdown(selectionConfig)),
							_Utils_Tuple2(
							'hiding',
							!$author$project$SelectionMode$showDropdown(selectionConfig))
						])),
					A2(
					$elm$html$Html$Attributes$style,
					'top',
					$elm$core$String$fromFloat(valueCasingHeight) + 'px'),
					A2(
					$elm$html$Html$Attributes$style,
					'width',
					$elm$core$String$fromFloat(valueCasingWidth) + 'px')
				]),
			_Utils_ap(
				optionsHtml,
				_List_fromArray(
					[dropdownFooterHtml])));
	});
var $author$project$MuchSelect$view = function (model) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$id('wrapper'),
				A2($elm$html$Html$Attributes$attribute, 'part', 'wrapper'),
				function () {
				var _v0 = $author$project$SelectionMode$getOutputStyle(model.a);
				if (!_v0) {
					return $author$project$Events$onMouseDownStopPropagationAndPreventDefault($author$project$MuchSelect$NoOp);
				} else {
					return $elm_community$html_extra$Html$Attributes$Extra$empty;
				}
			}(),
				$elm$html$Html$Attributes$classList(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'disabled',
						$author$project$SelectionMode$isDisabled(model.a))
					]))
			]),
		_List_fromArray(
			[
				$author$project$SelectionMode$isSingleSelect(model.a) ? A4($author$project$MuchSelect$singleSelectView, model.a, model.b, model.g, model.d) : A4($author$project$MuchSelect$multiSelectView, model.a, model.b, model.g, model.d),
				function () {
				var _v1 = $author$project$SelectionMode$getOutputStyle(model.a);
				if (!_v1) {
					return $author$project$OptionList$isSlottedOptionList(model.b) ? A4($author$project$MuchSelect$slottedDropdown, model.a, model.b, model.g, model.aL) : A4($author$project$MuchSelect$customHtmlDropdown, model.a, model.b, model.g, model.aL);
				} else {
					return $author$project$GroupedDropdownOptions$dropdownOptionsToDatalistHtml(
						A2($author$project$DropdownOptions$figureOutWhichOptionsToShowInTheDropdownThatAreNotSelected, model.a, model.b));
				}
			}()
			]));
};
var $author$project$MuchSelect$main = $elm$browser$Browser$element(
	{
		dk: function (flags) {
			return A2(
				$elm$core$Tuple$mapSecond,
				$author$project$MuchSelect$perform,
				$author$project$MuchSelect$init(flags));
		},
		eb: $author$project$MuchSelect$subscriptions,
		eh: $author$project$MuchSelect$updateWrapper,
		ej: $author$project$MuchSelect$view
	});
/*
_Platform_export({'MuchSelect':{'init':$author$project$MuchSelect$main(
	A2(
		$elm$json$Json$Decode$andThen,
		function (transformationAndValidationJson) {
			return A2(
				$elm$json$Json$Decode$andThen,
				function (showDropdownFooter) {
					return A2(
						$elm$json$Json$Decode$andThen,
						function (selectedValueEncoding) {
							return A2(
								$elm$json$Json$Decode$andThen,
								function (selectedValue) {
									return A2(
										$elm$json$Json$Decode$andThen,
										function (selectedItemStaysInPlace) {
											return A2(
												$elm$json$Json$Decode$andThen,
												function (searchStringMinimumLength) {
													return A2(
														$elm$json$Json$Decode$andThen,
														function (placeholder) {
															return A2(
																$elm$json$Json$Decode$andThen,
																function (outputStyle) {
																	return A2(
																		$elm$json$Json$Decode$andThen,
																		function (optionsJson) {
																			return A2(
																				$elm$json$Json$Decode$andThen,
																				function (optionSort) {
																					return A2(
																						$elm$json$Json$Decode$andThen,
																						function (maxDropdownItems) {
																							return A2(
																								$elm$json$Json$Decode$andThen,
																								function (loading) {
																									return A2(
																										$elm$json$Json$Decode$andThen,
																										function (isEventsOnly) {
																											return A2(
																												$elm$json$Json$Decode$andThen,
																												function (enableMultiSelectSingleItemRemoval) {
																													return A2(
																														$elm$json$Json$Decode$andThen,
																														function (disabled) {
																															return A2(
																																$elm$json$Json$Decode$andThen,
																																function (customOptionHint) {
																																	return A2(
																																		$elm$json$Json$Decode$andThen,
																																		function (allowMultiSelect) {
																																			return A2(
																																				$elm$json$Json$Decode$andThen,
																																				function (allowCustomOptions) {
																																					return $elm$json$Json$Decode$succeed(
																																						{a6: allowCustomOptions, a7: allowMultiSelect, bb: customOptionHint, bd: disabled, bf: enableMultiSelectSingleItemRemoval, bm: isEventsOnly, bo: loading, bp: maxDropdownItems, M: optionSort, bw: optionsJson, bx: outputStyle, by: placeholder, bB: searchStringMinimumLength, bD: selectedItemStaysInPlace, bE: selectedValue, h: selectedValueEncoding, bG: showDropdownFooter, bL: transformationAndValidationJson});
																																				},
																																				A2($elm$json$Json$Decode$field, 'allowCustomOptions', $elm$json$Json$Decode$bool));
																																		},
																																		A2($elm$json$Json$Decode$field, 'allowMultiSelect', $elm$json$Json$Decode$bool));
																																},
																																A2(
																																	$elm$json$Json$Decode$field,
																																	'customOptionHint',
																																	$elm$json$Json$Decode$oneOf(
																																		_List_fromArray(
																																			[
																																				$elm$json$Json$Decode$null($elm$core$Maybe$Nothing),
																																				A2($elm$json$Json$Decode$map, $elm$core$Maybe$Just, $elm$json$Json$Decode$string)
																																			]))));
																														},
																														A2($elm$json$Json$Decode$field, 'disabled', $elm$json$Json$Decode$bool));
																												},
																												A2($elm$json$Json$Decode$field, 'enableMultiSelectSingleItemRemoval', $elm$json$Json$Decode$bool));
																										},
																										A2($elm$json$Json$Decode$field, 'isEventsOnly', $elm$json$Json$Decode$bool));
																								},
																								A2($elm$json$Json$Decode$field, 'loading', $elm$json$Json$Decode$bool));
																						},
																						A2(
																							$elm$json$Json$Decode$field,
																							'maxDropdownItems',
																							$elm$json$Json$Decode$oneOf(
																								_List_fromArray(
																									[
																										$elm$json$Json$Decode$null($elm$core$Maybe$Nothing),
																										A2($elm$json$Json$Decode$map, $elm$core$Maybe$Just, $elm$json$Json$Decode$string)
																									]))));
																				},
																				A2($elm$json$Json$Decode$field, 'optionSort', $elm$json$Json$Decode$string));
																		},
																		A2($elm$json$Json$Decode$field, 'optionsJson', $elm$json$Json$Decode$string));
																},
																A2($elm$json$Json$Decode$field, 'outputStyle', $elm$json$Json$Decode$string));
														},
														A2(
															$elm$json$Json$Decode$field,
															'placeholder',
															A2(
																$elm$json$Json$Decode$andThen,
																function (_v0) {
																	return A2(
																		$elm$json$Json$Decode$andThen,
																		function (_v1) {
																			return $elm$json$Json$Decode$succeed(
																				_Utils_Tuple2(_v0, _v1));
																		},
																		A2($elm$json$Json$Decode$index, 1, $elm$json$Json$Decode$string));
																},
																A2($elm$json$Json$Decode$index, 0, $elm$json$Json$Decode$bool))));
												},
												A2(
													$elm$json$Json$Decode$field,
													'searchStringMinimumLength',
													$elm$json$Json$Decode$oneOf(
														_List_fromArray(
															[
																$elm$json$Json$Decode$null($elm$core$Maybe$Nothing),
																A2($elm$json$Json$Decode$map, $elm$core$Maybe$Just, $elm$json$Json$Decode$string)
															]))));
										},
										A2($elm$json$Json$Decode$field, 'selectedItemStaysInPlace', $elm$json$Json$Decode$bool));
								},
								A2($elm$json$Json$Decode$field, 'selectedValue', $elm$json$Json$Decode$string));
						},
						A2(
							$elm$json$Json$Decode$field,
							'selectedValueEncoding',
							$elm$json$Json$Decode$oneOf(
								_List_fromArray(
									[
										$elm$json$Json$Decode$null($elm$core$Maybe$Nothing),
										A2($elm$json$Json$Decode$map, $elm$core$Maybe$Just, $elm$json$Json$Decode$string)
									]))));
				},
				A2($elm$json$Json$Decode$field, 'showDropdownFooter', $elm$json$Json$Decode$bool));
		},
		A2($elm$json$Json$Decode$field, 'transformationAndValidationJson', $elm$json$Json$Decode$string)))(0)}});}(this));
*/
export const Elm = {'MuchSelect':{'init':$author$project$MuchSelect$main(
	A2(
		$elm$json$Json$Decode$andThen,
		function (transformationAndValidationJson) {
			return A2(
				$elm$json$Json$Decode$andThen,
				function (showDropdownFooter) {
					return A2(
						$elm$json$Json$Decode$andThen,
						function (selectedValueEncoding) {
							return A2(
								$elm$json$Json$Decode$andThen,
								function (selectedValue) {
									return A2(
										$elm$json$Json$Decode$andThen,
										function (selectedItemStaysInPlace) {
											return A2(
												$elm$json$Json$Decode$andThen,
												function (searchStringMinimumLength) {
													return A2(
														$elm$json$Json$Decode$andThen,
														function (placeholder) {
															return A2(
																$elm$json$Json$Decode$andThen,
																function (outputStyle) {
																	return A2(
																		$elm$json$Json$Decode$andThen,
																		function (optionsJson) {
																			return A2(
																				$elm$json$Json$Decode$andThen,
																				function (optionSort) {
																					return A2(
																						$elm$json$Json$Decode$andThen,
																						function (maxDropdownItems) {
																							return A2(
																								$elm$json$Json$Decode$andThen,
																								function (loading) {
																									return A2(
																										$elm$json$Json$Decode$andThen,
																										function (isEventsOnly) {
																											return A2(
																												$elm$json$Json$Decode$andThen,
																												function (enableMultiSelectSingleItemRemoval) {
																													return A2(
																														$elm$json$Json$Decode$andThen,
																														function (disabled) {
																															return A2(
																																$elm$json$Json$Decode$andThen,
																																function (customOptionHint) {
																																	return A2(
																																		$elm$json$Json$Decode$andThen,
																																		function (allowMultiSelect) {
																																			return A2(
																																				$elm$json$Json$Decode$andThen,
																																				function (allowCustomOptions) {
																																					return $elm$json$Json$Decode$succeed(
																																						{a6: allowCustomOptions, a7: allowMultiSelect, bb: customOptionHint, bd: disabled, bf: enableMultiSelectSingleItemRemoval, bm: isEventsOnly, bo: loading, bp: maxDropdownItems, M: optionSort, bw: optionsJson, bx: outputStyle, by: placeholder, bB: searchStringMinimumLength, bD: selectedItemStaysInPlace, bE: selectedValue, h: selectedValueEncoding, bG: showDropdownFooter, bL: transformationAndValidationJson});
																																				},
																																				A2($elm$json$Json$Decode$field, 'allowCustomOptions', $elm$json$Json$Decode$bool));
																																		},
																																		A2($elm$json$Json$Decode$field, 'allowMultiSelect', $elm$json$Json$Decode$bool));
																																},
																																A2(
																																	$elm$json$Json$Decode$field,
																																	'customOptionHint',
																																	$elm$json$Json$Decode$oneOf(
																																		_List_fromArray(
																																			[
																																				$elm$json$Json$Decode$null($elm$core$Maybe$Nothing),
																																				A2($elm$json$Json$Decode$map, $elm$core$Maybe$Just, $elm$json$Json$Decode$string)
																																			]))));
																														},
																														A2($elm$json$Json$Decode$field, 'disabled', $elm$json$Json$Decode$bool));
																												},
																												A2($elm$json$Json$Decode$field, 'enableMultiSelectSingleItemRemoval', $elm$json$Json$Decode$bool));
																										},
																										A2($elm$json$Json$Decode$field, 'isEventsOnly', $elm$json$Json$Decode$bool));
																								},
																								A2($elm$json$Json$Decode$field, 'loading', $elm$json$Json$Decode$bool));
																						},
																						A2(
																							$elm$json$Json$Decode$field,
																							'maxDropdownItems',
																							$elm$json$Json$Decode$oneOf(
																								_List_fromArray(
																									[
																										$elm$json$Json$Decode$null($elm$core$Maybe$Nothing),
																										A2($elm$json$Json$Decode$map, $elm$core$Maybe$Just, $elm$json$Json$Decode$string)
																									]))));
																				},
																				A2($elm$json$Json$Decode$field, 'optionSort', $elm$json$Json$Decode$string));
																		},
																		A2($elm$json$Json$Decode$field, 'optionsJson', $elm$json$Json$Decode$string));
																},
																A2($elm$json$Json$Decode$field, 'outputStyle', $elm$json$Json$Decode$string));
														},
														A2(
															$elm$json$Json$Decode$field,
															'placeholder',
															A2(
																$elm$json$Json$Decode$andThen,
																function (_v0) {
																	return A2(
																		$elm$json$Json$Decode$andThen,
																		function (_v1) {
																			return $elm$json$Json$Decode$succeed(
																				_Utils_Tuple2(_v0, _v1));
																		},
																		A2($elm$json$Json$Decode$index, 1, $elm$json$Json$Decode$string));
																},
																A2($elm$json$Json$Decode$index, 0, $elm$json$Json$Decode$bool))));
												},
												A2(
													$elm$json$Json$Decode$field,
													'searchStringMinimumLength',
													$elm$json$Json$Decode$oneOf(
														_List_fromArray(
															[
																$elm$json$Json$Decode$null($elm$core$Maybe$Nothing),
																A2($elm$json$Json$Decode$map, $elm$core$Maybe$Just, $elm$json$Json$Decode$string)
															]))));
										},
										A2($elm$json$Json$Decode$field, 'selectedItemStaysInPlace', $elm$json$Json$Decode$bool));
								},
								A2($elm$json$Json$Decode$field, 'selectedValue', $elm$json$Json$Decode$string));
						},
						A2(
							$elm$json$Json$Decode$field,
							'selectedValueEncoding',
							$elm$json$Json$Decode$oneOf(
								_List_fromArray(
									[
										$elm$json$Json$Decode$null($elm$core$Maybe$Nothing),
										A2($elm$json$Json$Decode$map, $elm$core$Maybe$Just, $elm$json$Json$Decode$string)
									]))));
				},
				A2($elm$json$Json$Decode$field, 'showDropdownFooter', $elm$json$Json$Decode$bool));
		},
		A2($elm$json$Json$Decode$field, 'transformationAndValidationJson', $elm$json$Json$Decode$string)))(0)}};
  