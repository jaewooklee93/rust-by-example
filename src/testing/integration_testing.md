## 통합 테스트

[단위 테스트][unit]는 한 번에 하나의 모듈을 격리하여 테스트합니다. 즉, 작고
사용자 정의 함수를 테스트할 수 있습니다. 통합 테스트는 crate 외부에서 실행되며,
단지 공개 인터페이스만 사용합니다. 그 목적은 라이브러리의 여러 부분이 올바르게
함께 작동하는지 테스트하는 것입니다.

Cargo는 `src` 옆에 있는 `tests` 디렉토리에서 통합 테스트를 찾습니다.

`src/lib.rs` 파일:

```rust,ignore
// `adder`라는 crate에서 정의합니다.
pub fn add(a: i32, b: i32) -> i32 {
    a + b
}
```

테스트 파일: `tests/integration_test.rs`:

```rust,ignore
#[test]
fn test_add() {
    assert_eq!(adder::add(3, 2), 5);
}
```

`cargo test` 명령어로 테스트 실행:

```shell
$ cargo test
running 0 tests

test result: ok. 0 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out

     Running target/debug/deps/integration_test-bcd60824f5fbfe19

running 1 test
test test_add ... ok

test result: ok. 1 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out

   Doc-tests adder

running 0 tests

test result: ok. 0 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out
```

`tests` 디렉토리의 각 Rust 소스 파일은 별도의 crate로 컴파일됩니다. 통합 테스트 간에
일부 코드를 공유하려면 공개 함수를 가진 모듈을 만들고 테스트에서 가져와 사용할 수 있습니다.

`tests/common/mod.rs` 파일:

```rust,ignore
pub fn setup() {
    // 필요한 파일/디렉토리를 생성하거나 서버를 시작하는 등의 설정 코드
}
```

테스트 파일: `tests/integration_test.rs`

```rust,ignore
// common 모듈 가져오기.
mod common;

#[test]
fn test_add() {
    // common 코드 사용.
    common::setup();
    assert_eq!(adder::add(3, 2), 5);
}
```

`tests/common.rs`로 모듈을 만들어도 되지만, 테스트 런너가 파일을 테스트 crate로 간주하여
내부에 테스트를 실행하려고 하므로 권장하지 않습니다.

[unit]: unit_testing.md
[mod]: ../mod.md
