## 폐쇄된 함수

폐쇄된 함수는 외부 환경을 캡처할 수 있는 함수입니다. 예를 들어, `x` 변수를 캡처하는 폐쇄된 함수:

```rust
|val| val + x
```

폐쇄된 함수의 문법과 기능은 즉석에서 사용하기에 매우 편리합니다. 폐쇄된 함수를 호출하는 것은 함수를 호출하는 것과 같습니다. 그러나 입력 및 반환 유형은 *추론*될 수 있으며 입력 변수 이름은 *필수로* 지정되어야 합니다.

폐쇄된 함수의 다른 특징은 다음과 같습니다.
* `||` 대신 `()`를 입력 변수 주변에 사용합니다.
* 텍스트를 한 줄로 표현하는 경우 (그렇지 않으면 필수) `{}`를 사용하여 몸체를 선택적으로 구분합니다.
* 외부 환경 변수를 캡처할 수 있습니다.

```rust,editable
fn main() {
    let outer_var = 42;
    
    // 일반 함수는 외부 환경의 변수를 참조할 수 없습니다
    //fn function(i: i32) -> i32 { i + outer_var }
    // TODO: 위 줄을 해제하고 컴파일러 오류를 확인하세요. 컴파일러는 대신 폐쇄된 함수를 정의하도록 제안합니다.

    // 폐쇄된 함수는 익명입니다. 여기서는 참조에 바인딩하고 있습니다.
    // 함수 선언과 동일하지만 선택적이며 `{}`는 몸체를 감싸는 것도 선택적입니다. 이러한 이름 없는 함수는 적절한 이름을 가진 변수에 할당됩니다.
    let closure_annotated = |i: i32| -> i32 { i + outer_var };
    let closure_inferred  = |i     |          i + outer_var  ;

    // 폐쇄된 함수를 호출합니다.
    println!("closure_annotated: {}", closure_annotated(1));
    println!("closure_inferred: {}", closure_inferred(1));
    // 폐쇄된 함수의 유형이 추론되면 다른 유형으로 다시 추론할 수 없습니다.
    //println!("cannot reuse closure_inferred with another type: {}", closure_inferred(42i64));
    // TODO: 위 줄을 해제하고 컴파일러 오류를 확인하세요.

    // 인수를 취하지 않는 폐쇄된 함수로 `i32`를 반환합니다.
    // 반환 유형은 추론됩니다.
    let one = || 1;
    println!("closure returning one: {}", one());

}
```
