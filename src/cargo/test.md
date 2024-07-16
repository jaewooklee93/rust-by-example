테스트

우리가 알고 있는 것처럼 테스트는 소프트웨어의 필수적인 부분입니다! Rust는 제일 훌륭한
s 지원을 제공합니다.

위에서 연결된 테스트 챕터에서 단위 테스트와 통합 테스트를 작성하는 방법을 볼 수 있습니다.

조직적으로, 우리는 테스트하는 모듈에 단위 테스트를 배치하고 통합 테스트를 자신의 `tests/` 디렉토리에 배치할 수 있습니다:

```txt
foo
├── Cargo.toml
├── src
│   └── main.rs
│   └── lib.rs
└── tests
    ├── my_test.rs
    └── my_other_test.rs
```

`tests` 디렉토리의 각 파일은 별개의 
[통합 테스트](https://doc.rust-lang.org/book/ch11-03-test-organization.html#integration-tests),
i.e. 의존하는 crate에서 호출되는 것처럼 보이는 테스트입니다.

[테스트][테스트] 챕터는 세 가지 다른 테스트 스타일에 대해 자세히 설명합니다: 
[단위][단위 테스트], [문서][문서 테스트], 그리고 [통합][통합 테스트]. 

`cargo`는 테스트를 실행하는 쉬운 방법을 자연스럽게 제공합니다!

```shell
$ cargo test
```

다음과 같은 출력을 볼 수 있습니다:

```shell
$ cargo test
   Compiling blah v0.1.0 (file:///nobackup/blah)
    Finished dev [unoptimized + debuginfo] target(s) in 0.89 secs
     Running target/debug/deps/blah-d3b32b97275ec472

running 4 tests
test test_bar ... ok
test test_baz ... ok
test test_foo_bar ... ok
test test_foo ... ok

test result: ok. 4 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out
```

이름이 패턴과 일치하는 테스트도 실행할 수 있습니다:

```shell
$ cargo test test_foo
```

```shell
$ cargo test test_foo
   Compiling blah v0.1.0 (file:///nobackup/blah)
    Finished dev [unoptimized + debuginfo] target(s) in 0.35 secs
     Running target/debug/deps/blah-d3b32b97275ec472

running 2 tests
test test_foo ... ok
test test_foo_bar ... ok

test result: ok. 2 passed; 0 failed; 0 ignored; 0 measured; 2 filtered out
```

주의 사항: Cargo는 여러 테스트를 동시에 실행할 수 있으므로 서로 경쟁하지 않도록 주의해야 합니다. 

이러한 병렬 실행이 문제를 일으키는 한 가지 예는 두 개의 테스트가 파일로 출력하는 것입니다.

```rust
#[cfg(test)]
mod tests {
    // 필요한 모듈을 가져옵니다
    use std::fs::OpenOptions;
    use std::io::Write;

    // 이 테스트는 파일로 쓰기
    #[test]
    fn test_file() {
        // 파일 ferris.txt를 열거나 존재하지 않으면 새로 생성합니다.
        let mut file = OpenOptions::new()
            .append(true)
            .create(true)
            .open("ferris.txt")
            .expect("ferris.txt를 열 수 없습니다");

        // "Ferris"를 5번 출력합니다.
        for _ in 0..5 {
            file.write_all("Ferris\n".as_bytes())
                .expect("ferris.txt에 쓰기 실패");
        }
    }

    // 이 테스트는 동일한 파일로 쓰려고 합니다.
    #[test]
    fn test_file_also() {
        // 파일 ferris.txt를 열거나 존재하지 않으면 새로 생성합니다.
        let mut file = OpenOptions::new()
            .append(true)
            .create(true)
            .open("ferris.txt")
            .expect("ferris.txt를 열 수 없습니다");

        // "Corro"를 5번 출력합니다.
        for _ in 0..5 {
            file.write_all("Corro\n".as_bytes())
                .expect("ferris.txt에 쓰기 실패");
        }
    }
}
```

원하는 결과는 다음과 같습니다:
```shell
$ cat ferris.txt
Ferris
Ferris
Ferris
Ferris
Ferris
Corro
Corro
Corro
Corro
Corro
```
`ferris.txt`에 실제로 들어가는 내용은 다음과 같습니다:
```shell
$ cargo test test_file && cat ferris.txt
Corro
Ferris
Corro
Ferris
Corro
Ferris
Corro
Ferris
Corro
Ferris
```

[testing]: ../testing.md
[unit_testing]: ../testing/unit_testing.md
[integration_testing]: ../testing/integration_testing.md
[doc_testing]: ../testing/doc_testing.md
