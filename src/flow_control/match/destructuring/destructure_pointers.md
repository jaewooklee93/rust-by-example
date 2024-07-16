## 포인터/참조

포인터의 경우, 해제와 해제를 구분해야 합니다. 이는 C/C++와 같은 언어에서 다르게 사용되는 개념이기 때문입니다.

* 해제는 `*`를 사용합니다.
* 해제는 `&`, `ref`, `ref mut`를 사용합니다.

```rust,editable
fn main() {
    // `i32` 유형의 참조를 할당합니다. `&`는 참조가 할당되고 있음을 나타냅니다.
    let reference = &4;

    match reference {
        // `reference`가 `&val` 패턴에 일치하면, 다음과 같은 비교가 이루어집니다.
        // `&i32`
        // `&val`
        // ^ `&`가 모두 삭제되면 `i32`가 `val`에 할당되어야 합니다.
        &val => println!("Got a value via destructuring: {:?}", val),
    }

    // `&`를 피하려면, 일치하기 전에 해제합니다.
    match *reference {
        val => println!("Got a value via dereferencing: {:?}", val),
    }

    // 참조로 시작하지 않았을 때? `reference`는 오른쪽이 이미 참조이기 때문에 `&`였습니다. 이것은 오른쪽이 참조가 아니기 때문에 참조가 아닙니다.
    let _not_a_reference = 3;

    // Rust는 `ref` 키워드를 정확히 이러한 목적으로 제공합니다. 이 키워드는 요소에 대한 참조를 생성하고 이 참조를 할당합니다.
    let ref _is_a_reference = 3;

    // 따라서 2개의 값을 참조 없이 정의하면, `ref`와 `ref mut`를 통해 참조를 가져올 수 있습니다.
    let value = 5;
    let mut mut_value = 6;

    // `ref` 키워드를 사용하여 참조를 생성합니다.
    match value {
        ref r => println!("Got a reference to a value: {:?}", r),
    }

    // `ref mut`를 유사하게 사용합니다.
    match mut_value {
        ref mut m => {
            // 참조를 가져왔습니다. 값을 추가하기 전에 해제해야 합니다.
            *m += 10;
            println!("We added 10. `mut_value`: {:?}", m);
        },
    }
}
```

### 참조:

[ref 패턴](../../../scope/borrow/ref.md)
