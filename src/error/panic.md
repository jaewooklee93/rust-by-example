## `panic`

가장 간단한 오류 처리 메커니즘은 `panic`입니다. 오류 메시지를 출력하고 스택을 해제하며 일반적으로 프로그램을 종료합니다.
다음은 오류 조건에서 `panic`를 명시적으로 호출하는 예입니다.

```rust,editable,ignore,mdbook-runnable
fn drink(beverage: &str) {
    // 과도한 설탕 음료 섭취는 좋지 않습니다.
    if beverage == "레몬에이드" { panic!("AAAaaaaa!!!!"); }

    println!("얼음 차가운 {}만이 필요합니다.", beverage);
}

fn main() {
    drink("물");
    drink("레몬에이드");
    drink("물");
}
```

`drink` 함수의 첫 번째 호출은 정상적으로 작동합니다. 두 번째 호출은 `panic`을 일으키므로 세 번째 호출은 실행되지 않습니다.
