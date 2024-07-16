## 상수

Rust는 어떤 범위에서든 선언할 수 있는 두 가지 유형의 상수가 있습니다.
두 가지 모두 명시적인 유형 지정이 필요합니다.

* `const`: 변경할 수 없는 값 (흔한 경우).
* `static`: `['static']` 수명을 가진 변경 가능한 변수입니다.
`'static` 수명은 유추되며 명시적으로 지정할 필요가 없습니다.
변경 가능한 `static` 변수에 액세스하거나 수정하는 것은 [`unsafe`][unsafe]입니다.

```rust,editable,ignore,mdbook-runnable
// 글로벌 변수는 모든 다른 범위 외부에서 선언됩니다.
static LANGUAGE: &str = "Rust";
const THRESHOLD: i32 = 10;

fn is_big(n: i32) -> bool {
    // 함수에서 상수에 액세스
    n > THRESHOLD
}

fn main() {
    let n = 16;

    // 메인 스레드에서 상수에 액세스
    println!("This is {}", LANGUAGE);
    println!("The threshold is {}", THRESHOLD);
    println!("{} is {}", n, if is_big(n) { "big