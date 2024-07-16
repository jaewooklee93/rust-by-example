## 관습

이전 장에서 다음과 같은 디렉토리 구조를 보았습니다.

```txt
foo
├── Cargo.toml
└── src
    └── main.rs
```

만약 같은 프로젝트에 두 개의 실행 파일이 필요하다면 어떻게 해야 할까요?

`cargo`는 이를 지원합니다. 기본 실행 파일 이름은 `main` 이지만, `bin/` 디렉토리에 추가 실행 파일을 배치하여 추가 실행 파일을 만들 수 있습니다.

```txt
foo
├── Cargo.toml
└── src
    ├── main.rs
    └── bin
        └── my_other_bin.rs
```

`cargo`에 해당 실행 파일만 컴파일하거나 실행하도록 지시하려면 `cargo`에 `--bin my_other_bin` 플래그를 전달합니다. 여기서 `my_other_bin`은 작업하려는 실행 파일의 이름입니다.

추가 실행 파일 외에도 `cargo`는 [더 많은 기능]과 같은 벤치마크, 테스트 및 예제를 지원합니다.

다음 장에서는 테스트를 자세히 살펴보겠습니다.

[더 많은 기능]: https://doc.rust-lang.org/cargo/guide/project-layout.html
