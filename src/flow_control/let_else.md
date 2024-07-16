## let-else


> 🛈 stable since: rust 1.65
>
> 🛈 특정 버전을 대상으로 컴파일하려면 다음과 같이 컴파일할 수 있습니다.
> `rustc --edition=2021 main.rs`


`let`-`else`를 사용하면 반증 가능한 패턴이 주변 범위에서 정상적인 `let`과 같이 매치되어 변수에 바인딩될 수 있습니다. 또는 패턴이 매치되지 않으면 `break`, `return`, `panic!`와 같은 방식으로 발산할 수 있습니다.

```rust
use std::str::FromStr;

fn get_count_item(s: &str) -> (u64, &str) {
    let mut it = s.split(' ');
    let (Some(count_str), Some(item)) = (it.next(), it.next()) else {
        panic!("Can't segment count item pair: '{s}'");
    };
    let Ok(count) = u64::from_str(count_str) else {
        panic!("Can't parse integer: '{count_str}'");
    };
    (count, item)
}

fn main() {
    assert_eq!(get_count_item("3 chairs"), (3, "chairs"));
}
```

변수 바인딩의 범위는 이것이 `match` 또는 `if let`-`else` 표현식과 다른 가장 중요한 점입니다. 이전에는 불행하게도 반복적인 코드 조각과 외부 `let`을 사용하여 이러한 패턴을 근사적으로 표현할 수 있었습니다.

```rust
# use std::str::FromStr;
# 
# fn get_count_item(s: &str) -> (u64, &str) {
#     let mut it = s.split(' ');
    let (count_str, item) = match (it.next(), it.next()) {
        (Some(count_str), Some(item)) => (count_str, item),
        _ => panic!("Can't segment count item pair: '{s}'"),
    };
    let count = if let Ok(count) = u64::from_str(count_str) {
        count
    } else {
        panic!("Can't parse integer: '{count_str}'");
    };
#     (count, item)
# }
# 
# assert_eq!(get_count_item("3 chairs"), (3, "chairs"));
```

### 참조

[option][option], [match][match], [if let][if_let] 및 [let-else RFC][let_else_rfc].


[match]: ./match.md
[if_let]: ./if_let.md
[let_else_rfc]: https://rust-lang.github.io/rfcs/3137-let-else.html
[option]: ../std/option.md
