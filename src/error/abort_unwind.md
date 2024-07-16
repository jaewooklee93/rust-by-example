## `abort`와 `unwind`

이전 섹션에서는 오류 처리 메커니즘인 `panic`를 설명했습니다. `panic` 설정에 따라 다른 코드 경로가 조건적으로 컴파일될 수 있습니다. 현재 사용 가능한 값은 `unwind`와 `abort`입니다.


레몬에이드 예제를 바탕으로 `panic` 전략을 명시적으로 사용하여 다른 코드 줄을 실행합니다.

```rust,editable,mdbook-runnable
fn drink(beverage: &str) {
    // 과도한 설탕 음료 섭취는 좋지 않습니다.
    if beverage == "lemonade" {
        if cfg!(panic = "abort") {
            println!("이건 당신의 파티가 아닙니다. 도망쳐!!!!");
        } else {
            println!("뱉어내!!!!");
        }
    } else {
        println!("어떤 상큼한 {}만이 필요합니다.", beverage);
    }
}

fn main() {
    drink("water");
    drink("lemonade");
}
```

`unwind` 키워드를 명시적으로 사용하여 `drink()` 함수를 다시 작성하는 또 다른 예제입니다.

```rust,editable
#[cfg(panic = "unwind")]
fn ah() {
    println!("뱉어내!!!!");
}

#[cfg(not(panic = "unwind"))]
fn ah() {
    println!("이건 당신의 파티가 아닙니다. 도망쳐!!!!");
}

fn drink(beverage: &str) {
    if beverage == "lemonade" {
        ah();
    } else {
        println!("어떤 상큼한 {}만이 필요합니다.", beverage);
    }
}

fn main() {
    drink("water");
    drink("lemonade");
}
```

명령줄에서 `abort` 또는 `unwind`를 사용하여 `panic` 전략을 설정할 수 있습니다.

```console
rustc  lemonade.rs -C panic=abort
```

