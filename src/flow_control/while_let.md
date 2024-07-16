## while let

`if let`과 유사하게, `while let`은 어색한 `match` 순서를 더 견딜 수 있게 해줍니다. 다음과 같은 순서를 고려해 보세요. 이 순서는 `i`를 증가시킵니다.

```rust
// `optional`을 `Option<i32>` 유형으로 만듭니다.
let mut optional = Some(0);

// 반복적으로 이 테스트를 시도합니다.
loop {
    match optional {
        // `optional`이 해체되면 블록을 평가합니다.
        Some(i) => {
            if i > 9 {
                println!("9보다 크므로 종료!");
                optional = None;
            } else {
                println!("`i`는 `{:?}`입니다. 다시 시도해 보세요.", i);
                optional = Some(i + 1);
            }
            // ^ 3개의 들여쓰기가 필요합니다!
        },
        // 해체가 실패하면 루프를 종료합니다:
        _ => { break; }
        // ^ 이것이 왜 필요한가요? 훨씬 나은 방법이 있어야 합니다!
    }
}
```

`while let`을 사용하면 이 순서가 훨씬 깔끔해집니다.

```rust,editable
fn main() {
    // `optional`을 `Option<i32>` 유형으로 만듭니다.
    let mut optional = Some(0);
    
    // 이것은 "`let`이 `optional`을 `Some(i)`로 해체하면 블록 (`{}`)을 평가합니다. 그렇지 않으면 `break`"라고 읽습니다.
    while let Some(i) = optional {
        if i > 9 {
            println!("9보다 크므로 종료!");
            optional = None;
        } else {
            println!("`i`는 `{:?}`입니다. 다시 시도해 보세요.", i);
            optional = Some(i + 1);
        }
        // ^ 오른쪽으로 쏠리는 현상이 줄어들고 명시적으로 실패하는 경우를 처리할 필요가 없습니다.
    }
    // ^ `if let`은 추가적인 선택적 `else`/`else if` 조항이 있었습니다. `while let`은 이러한 조항이 없습니다.
}
```

### 참조:

[`enum`][enum], [`Option`][option], and the [RFC][while_let_rfc]

[enum]: ../custom_types/enum.md
[option]: ../std/option.md
[while_let_rfc]: https://github.com/rust-lang/rfcs/pull/214
