## `cfg`

구성 조건 검사는 두 가지 다른 연산자를 통해 가능합니다.

* `cfg` 속성: 속성 위치에서 `#[cfg(...)]`
* `cfg!` 매크로: 불린 표현에서 `cfg!(...)`

두 가지 모두 동일한 인수 구문을 사용하지만, 전자는 조건부 컴파일을 가능하게 하고, 후자는 실행 시에 `true` 또는 `false` 리터럴로 조건부로 평가됩니다.

`cfg!`는 `#[cfg]`와 달리 코드를 제거하지 않고 `true` 또는 `false`로만 평가됩니다. 예를 들어, `cfg!`가 사용된 조건에 관계없이 `if/else` 표현의 모든 블록이 유효해야 합니다.

```rust,editable
// 타겟 OS가 linux일 경우에만 이 함수가 컴파일됩니다
#[cfg(target_os = "linux")]
fn are_you_on_linux() {
    println!("You are running linux!");
}

// 그리고 이 함수는 타겟 OS가 *아닌* linux일 경우에만 컴파일됩니다
#[cfg(not(target_os = "linux"))]
fn are_you_on_linux() {
    println!("You are *not* running linux!");
}

fn main() {
    are_you_on_linux();

    println!("Are you sure?");
    if cfg!(target_os = "linux") {
        println!("Yes. It's definitely linux!");
    } else {
        println!("Yes. It's definitely *not* linux!");
    }
}
```

### 참조:

[참조][ref], [`cfg!`][cfg], and [매크로][macros].

[cfg]: https://doc.rust-lang.org/std/macro.cfg!.html
[macros]: ../macros.md
[ref]: https://doc.rust-lang.org/reference/attributes.html#conditional-compilation
