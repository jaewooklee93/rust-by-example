## 기본형

Rust는 다양한 `기본형`에 접근할 수 있습니다. 예시는 다음과 같습니다.

### 스칼라 유형

* 부호 있는 정수: `i8`, `i16`, `i32`, `i64`, `i128` 및 `isize` (포인터 크기)
* 부호 없는 정수: `u8`, `u16`, `u32`, `u64`, `u128` 및 `usize` (포인터
  크기)
* 부동 소수점: `f32`, `f64`
* `char` 유니코드 스칼라 값과 같이 `'a'`, `'α'` 및 `'∞'` (각각 4 바이트)
* `bool` `true` 또는 `false`
* 단위 유형 `()`, 유일한 가능한 값은 빈 튜플입니다: `()`

단위 유형의 값이 튜플이지만, 여러 값을 포함하지 않기 때문에 복합 유형으로 간주되지 않습니다.

### 복합 유형

* 배열과 같이 `[1, 2, 3]`
* 튜플과 같이 `(1, true)`

변수는 항상 *유형을 명시적으로 지정*할 수 있습니다. 숫자는 추가적으로 *후缀* 또는 *기본값*을 통해 지정할 수 있습니다. 정수는 기본적으로 `i32`이고 부동 소수점은 `f64`입니다. Rust는 맥락에서 유형을 추론할 수도 있습니다.

```rust,editable,ignore,mdbook-runnable
fn main() {
    // 변수는 유형을 명시적으로 지정할 수 있습니다.
    let logical: bool = true;

    let a_float: f64 = 1.0;  // 정규 지정
    let an_integer   = 5i32; // 후缀 지정

    // 또는 기본값이 사용됩니다.
    let default_float   = 3.0; // `f64`
    let default_integer = 7;   // `i32`

    // 맥락에서 유형이 추론될 수 있습니다.
    let mut inferred_type = 12; // 다른 줄에서 유형 i64가 추론됩니다.
    inferred_type = 4294967296i64;

    // 변경 가능한 변수의 값을 변경할 수 있습니다.
    let mut mutable = 12; // 변경 가능한 `i32`
    mutable = 21;

    // 오류! 변수의 유형을 변경할 수 없습니다.
    mutable = true;

    // 변수는 덮어쓰기로 그림자를 만들 수 있습니다.
    let mutable = true;
}
```

### 참조:

[the `std` library][std], [`mut`][mut], [`inference`][inference], and
[`shadowing`][shadowing]

[std]: https://doc.rust-lang.org/std/
[mut]: variable_bindings/mut.md
[inference]: types/inference.md
[shadowing]: variable_bindings/scope.md
