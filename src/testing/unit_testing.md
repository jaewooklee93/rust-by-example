## 단위 테스트

테스트는 Rust 함수로, 비테스트 코드가 예상대로 작동하는지 확인합니다.
테스트 함수의 본문은 일반적으로 일부 설정을 수행하고 테스트하려는 코드를 실행한 다음 결과가 우리가 기대하는지 확인하는 코드를 포함합니다.

대부분의 단위 테스트는 `tests` [모듈][mod]에 `#[cfg(test)]` [속성][attribute]이 포함되어 있습니다.
테스트 함수는 `#[test]` 속성으로 표시됩니다.

테스트 함수가 [panic][panic]하면 테스트가 실패합니다. 몇 가지 유용한 [메타프로그래밍][macros]이 있습니다.

* `assert!(expression)` - `expression`이 `false`로 평가되면 panic합니다.
* `assert_eq!(left, right)` 및 `assert_ne!(left, right)` - `left`와 `right` 표현식을 각각 등식 및 부등식으로 테스트합니다.

```rust,ignore
pub fn add(a: i32, b: i32) -> i32 {
    a + b
}

// 이것은 매우 나쁜 더하기 함수이며, 이 예제에서 실패하도록 설계되었습니다.
#[allow(dead_code)]
fn bad_add(a: i32, b: i32) -> i32 {
    a - b
}

#[cfg(test)]
mod tests {
    // 이 유용한 습관을 참고하세요: 외부(모듈 테스트를 위한) 범위에서 이름을 가져오는 것
    use super::*;

    #[test]
    fn test_add() {
        assert_eq!(add(1, 2), 3);
    }

    #[test]
    fn test_bad_add() {
        // 이 assert가 실행되고 테스트가 실패합니다.
        // 주의: 개인적인 함수도 테스트할 수 있습니다!
        assert_eq!(bad_add(1, 2), 3);
    }
}
```

테스트는 `cargo test`로 실행할 수 있습니다.

```shell
$ cargo test

running 2 tests
test tests::test_bad_add ... FAILED
test tests::test_add ... ok

failures:

---- tests::test_bad_add stdout ----
        thread 'tests::test_bad_add' panicked at 'assertion failed: `(left == right)`
  left: `-1`,
 right: `3`', src/lib.rs:21:8
note: Run with `RUST_BACKTRACE=1` for a backtrace.


failures:
    tests::test_bad_add

test result: FAILED. 1 passed; 1 failed; 0 ignored; 0 measured; 0 filtered out
```

## 테스트 및 `?`

이전 단위 테스트 예제 중 어떤 것도 반환 유형이 없었습니다. 그러나 Rust 2018부터 단위 테스트에서 `Result<()>`를 반환할 수 있으며, 이를 통해 `?`를 사용할 수 있습니다! 이것은 테스트를 훨씬 더 간결하게 만들 수 있습니다.

```rust,editable
fn sqrt(number: f64) -> Result<f64, String> {
    if number >= 0.0 {
        Ok(number.powf(0.5))
    } else {
        Err("negative floats don't have square roots".to_owned())
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_sqrt() -> Result<(), String> {
        let x = 4.0;
        assert_eq!(sqrt(x)?.powf(2.0), x);
        Ok(())
    }
}
```

더 자세한 내용은 ["The Edition Guide"][editionguide]를 참조하십시오.

## 테스트 패닉

특정 조건에서 panic해야 하는 함수를 테스트하려면 `#[should_panic]` 속성을 사용합니다. 이 속성은 옵셔널 매개변수 `expected = `를 받아 panic 메시지의 텍스트를 지정할 수 있습니다. 함수가 여러 가지 방법으로 panic할 수 있는 경우 테스트가 올바른 panic을 테스트하는 데 도움이 됩니다.

```rust,ignore
pub fn divide_non_zero_result(a: u32, b: u32) -> u32 {
    if b == 0 {
        panic!("Divide-by-zero error");
    } else if a < b {
        panic!("Divide result is zero");
    }
    a / b
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_divide() {
        assert_eq!(divide_non_zero_result(10, 2), 5);
    }

    #[test]
    #[should_panic]
    fn test_any_panic() {
        divide_non_zero_result(1, 0);
    }

```

    #[test]
    #[should_panic(expected = "Divide result is zero")]
    fn test_specific_panic() {
        divide_non_zero_result(1, 10);
    }
}
```

이러한 테스트를 실행하면 다음과 같은 결과를 얻습니다.

```shell
$ cargo test

3개의 테스트 실행 중
test tests::test_any_panic ... ok
test tests::test_divide ... ok
test tests::test_specific_panic ... ok

test 결과: ok. 3개 통과; 0개 실패; 0개 무시; 0개 측정; 0개 필터링

   Doc-tests tmp-test-should-panic

0개의 테스트 실행 중

test 결과: ok. 0개 통과; 0개 실패; 0개 무시; 0개 측정; 0개 필터링
```

## 특정 테스트 실행

특정 테스트를 실행하려면 `cargo test` 명령어에 테스트 이름을 지정할 수 있습니다.

```shell
$ cargo test test_any_panic
1개의 테스트 실행 중
test tests::test_any_panic ... ok

test 결과: ok. 1개 통과; 0개 실패; 0개 무시; 0개 측정; 2개 필터링

   Doc-tests tmp-test-should-panic

0개의 테스트 실행 중

test 결과: ok. 0개 통과; 0개 실패; 0개 무시; 0개 측정; 0개 필터링
```

여러 테스트를 실행하려면 실행해야 할 테스트 이름의 일부를 지정할 수 있습니다.

```shell
$ cargo test panic
2개의 테스트 실행 중
test tests::test_any_panic ... ok
test tests::test_specific_panic ... ok

test 결과: ok. 2개 통과; 0개 실패; 0개 무시; 0개 측정; 1개 필터링

   Doc-tests tmp-test-should-panic

0개의 테스트 실행 중

test 결과: ok. 0개 통과; 0개 실패; 0개 무시; 0개 측정; 0개 필터링
```

## 테스트 무시

`#[ignore]` 속성을 사용하여 테스트를 무시하고 실행하지 않도록 할 수 있습니다. 또는 `cargo test -- --ignored` 명령어를 사용하여 무시된 테스트를 실행할 수 있습니다.

```rust,ignore
pub fn add(a: i32, b: i32) -> i32 {
    a + b
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_add() {
        assert_eq!(add(2, 2), 4);
    }

    #[test]
    fn test_add_hundred() {
        assert_eq!(add(100, 2), 102);
        assert_eq!(add(2, 100), 102);
    }

    #[test]
    #[ignore]
    fn ignored_test() {
        assert_eq!(add(0, 0), 0);
    }
}
```

```shell
$ cargo test
3개의 테스트 실행 중
test tests::ignored_test ... ignored
test tests::test_add ... ok
test tests::test_add_hundred ... ok

test 결과: ok. 2개 통과; 0개 실패; 1개 무시; 0개 측정; 0개 필터링

   Doc-tests tmp-ignore

0개의 테스트 실행 중

test 결과: ok. 0개 통과; 0개 실패; 0개 무시; 0개 측정; 0개 필터링

$ cargo test -- --ignored
1개의 테스트 실행 중
test tests::ignored_test ... ok

test 결과: ok. 1개 통과; 0개 실패; 0개 무시; 0개 측정; 0개 필터링

   Doc-tests tmp-ignore

0개의 테스트 실행 중

test 결과: ok. 0개 통과; 0개 실패; 0개 무시; 0개 측정; 0개 필터링
```

[attribute]: ../attribute.md
[panic]: ../std/panic.md
[macros]: ../macros.md
[mod]: ../mod.md
[editionguide]: https://doc.rust-lang.org/edition-guide/rust-2018/error-handling-and-panics/question-mark-in-main-and-tests.html
