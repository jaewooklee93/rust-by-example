# Strings

The two most used string types in Rust are `String` and `&str`.

A `String` is stored as a vector of bytes (`Vec<u8>`), but guaranteed to
always be a valid UTF-8 sequence. `String` is heap allocated, growable and not
null terminated.

`&str` is a slice (`&[u8]`) that always points to a valid UTF-8 sequence, and
can be used to view into a `String`, just like `&[T]` is a view into `Vec<T>`.

```rust,editable
fn main() {
    // (all the type annotations are superfluous)
    // A reference to a string allocated in read only memory
    let pangram: &'static str = "the quick brown fox jumps over the lazy dog";
    println!("Pangram: {}", pangram);

    // Iterate over words in reverse, no new string is allocated
    println!("Words in reverse");
    for word in pangram.split_whitespace().rev() {
        println!("> {}", word);
    }

    // Copy chars into a vector, sort and remove duplicates
    let mut chars: Vec<char> = pangram.chars().collect();
    chars.sort();
    chars.dedup();

    // Create an empty and growable `String`
    let mut string = String::new();
    for c in chars {
        // Insert a char at the end of string
        string.push(c);
        // Insert a string at the end of string
        string.push_str(", ");
    }

    // The trimmed string is a slice to the original string, hence no new
    // allocation is performed
    let chars_to_trim: &[char] = &[' ', ','];
    let trimmed_str: &str = string.trim_matches(chars_to_trim);
    println!("Used characters: {}", trimmed_str);

    // Heap allocate a string
    let alice = String::from("I like dogs");
    // Allocate new memory and store the modified string there
    let bob: String = alice.replace("dog", "cat");

    println!("Alice says: {}", alice);
    println!("Bob says: {}", bob);
}
```

More `str`/`String` methods can be found under the
[std::str][str] and
[std::string][string]
modules

## Literals and escapes

There are multiple ways to write string literals with special characters in them.
All result in a similar `&str` so it's best to use the form that is the most
convenient to write. Similarly there are multiple ways to write byte string literals,
which all result in `&[u8; N]`.

Generally special characters are escaped with a backslash character: `\`.
This way you can add any character to your string, even unprintable ones
and ones that you don't know how to type. If you want a literal backslash,
escape it with another one: `\\`

String or character literal delimiters occurring within a literal must be escaped: `"\""`, `'\''`.

```rust,editable
fn main() {
    // You can use escapes to write bytes by their hexadecimal values...
    let byte_escape = "I'm writing \x52\x75\x73\x74!";
    println!("What are you doing\x3F (\\x3F means ?) {}", byte_escape);

    // ...or Unicode code points.
    let unicode_codepoint = "\u{211D}";
    let character_name = "\"DOUBLE-STRUCK CAPITAL R\"";

    println!("Unicode character {} (U+211D) is called {}",
                unicode_codepoint, character_name );


    let long_string = "String literals
                        can span multiple lines.
                        The linebreak and indentation here ->\
                        <- can be escaped too!";
    println!("{}", long_string);
}
```

Sometimes there are just too many characters that need to be escaped or it's just
much more convenient to write a string out as-is. This is where raw string literals come into play.

```rust, editable
fn main() {
    let raw_str = r"Escapes don't work here: \x3F \u{211D}";
    println!("{}", raw_str);

    // If you need quotes in a raw string, add a pair of #s
    let quotes = r#"And then I said: "There is no escape!""#;
    println!("{}", quotes);

    // 문자열에 "#"이 필요하면, 구분자에 더 많은 "#"를 사용하세요.
    // 최대 255개의 "#"를 사용할 수 있습니다.
    let longer_delimiter = r###"문자열에 "#"이 있습니다. 심지어 "##"도 있습니다!"###;
    println!("{}", longer_delimiter);
}
```

UTF-8가 아닌 문자열이 필요하신가요? (기억하세요, `str`과 `String`은 유효한 UTF-8여야 합니다).
혹시 주로 텍스트인 바이트 배열을 원하시나요? 바이트 문자열이 도움이 될 수 있습니다!

```rust, editable
use std::str;

fn main() {
    // 이것은 실제로 `&str`이 아닙니다.
    let bytestring: &[u8; 21] = b"this is a byte string";

    // 바이트 배열은 `Display` 트레이트를 가지고 있지 않으므로 출력이 제한적입니다.
    println!("바이트 문자열: {:?}", bytestring);

    // 바이트 문자열에는 바이트 이스케이프가 있을 수 있습니다...
    let escaped = b"\x52\x75\x73\x74 as bytes";
    // ...하지만 유니코드 이스케이프는 없습니다
    // let escaped = b"\u{211D} is not allowed";
    println!("일부 이스케이프된 바이트: {:?}", escaped);


    // 生の바이트文字列は生の文字列と同じように動作します
    let raw_bytestring = br"\u{211D} is not escaped here";
    println!("{:?}", raw_bytestring);

    // 바이트 배열을 `str`로 변환하는 것은 실패할 수 있습니다.
    if let Ok(my_str) = str::from_utf8(raw_bytestring) {
        println!("그리고 텍스트로 동일하게: '{}'", my_str);
    }

    let _quotes = br#"You can also use "fancier" formatting, \
                    like with normal raw strings"#;

    // 바이트 문자열은 UTF-8가 아니어도 됩니다.
    let shift_jis = b"\x82\xe6\x82\xa8\x82\xb1\x82\xbb"; // SHIFT-JIS로 "ようこそ"

    // 그러나 항상 `str`로 변환될 수는 없습니다.
    match str::from_utf8(shift_jis) {
        Ok(my_str) => println!("변환 성공: '{}'", my_str),
        Err(e) => println!("변환 실패: {:?}", e),
    };
}
```

문자 인코딩 간 변환은 [encoding][encoding-crate] crate를 참조하세요.

문자열 리터럴을 작성하고 이스케이프 문자를 사용하는 방법에 대한 자세한 목록은 Rust 참조의 ['Tokens' 챕터][tokens]를 참조하세요.

[str]: https://doc.rust-lang.org/std/str/
[string]: https://doc.rust-lang.org/std/string/
[tokens]: https://doc.rust-lang.org/reference/tokens.html
[encoding-crate]: https://crates.io/crates/encoding
