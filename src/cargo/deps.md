## 의존성

대부분의 프로그램은 라이브러리에 대한 의존성을 가지고 있습니다. 만약 당신이
직접 의존성을 관리해 본 적이 있다면, 얼마나 번거로운 일인지 알고 계실 것입니다.
다행히 Rust는 `cargo`라는 도구를 기본으로 제공합니다! `cargo`는 프로젝트의
의존성을 관리할 수 있습니다.

새로운 Rust 프로젝트를 만들려면,

```sh
# 바이너리
cargo new foo

# 라이브러리
cargo new --lib bar
```

이후의 설명에서는 바이너리를 만들고 있다고 가정하지만, 라이브러리와
의 개념은 동일합니다.

위 명령어를 실행하면 다음과 같은 파일 구조가 생성됩니다.

```txt
.
├── bar
│   ├── Cargo.toml
│   └── src
│       └── lib.rs
└── foo
    ├── Cargo.toml
    └── src
        └── main.rs
```

`main.rs`는 새로운 `foo` 프로젝트의 루트 소스 파일입니다. `Cargo.toml`은
이 프로젝트의 `cargo` 설정 파일입니다. 안에 들어있는 내용은 다음과 같습니다.

```toml
[package]
name = "foo"
version = "0.1.0"
authors = ["mark"]

[dependencies]
```

`[package]` 섹션 아래 `name` 필드는 프로젝트 이름을 결정합니다. 이는
`crates.io`에 크레이트를 게시할 때 사용되며, 컴파일 시 출력 바이너리 이름이기도 합니다.

`version` 필드는 [Semantic Versioning](http://semver.org/)을 사용하는 크레이트 버전 번호입니다.

`authors` 필드는 크레이트를 게시할 때 사용되는 저자 목록입니다.

`[dependencies]` 섹션은 프로젝트에 대한 의존성을 추가하는 데 사용됩니다.

예를 들어, 프로그램에 훌륭한 CLI가 필요하다고 가정해 보겠습니다. [crates.io](https://crates.io)에서
많은 훌륭한 패키지를 찾을 수 있습니다. (Rust 공식 패키지 레지스트리). 인기 있는 선택지 중 하나는
[clap](https://crates.io/crates/clap)입니다. 현재 버전은 `2.27.1`입니다. 프로그램에 의존성을 추가하려면
`Cargo.toml`의 `[dependencies]` 아래에 다음과 같이 추가하면 됩니다.
`clap = "2.27.1"`. 이것만으로도 `clap`를 프로그램에서 사용할 수 있습니다.

`cargo`는 [다른 유형의 의존성](https://doc.rust-lang.org/cargo/reference/specifying-dependencies.html)을 지원합니다. 몇 가지 예시는 다음과 같습니다.

```toml
[package]
name = "foo"
version = "0.1.0"
authors = ["mark"]

[dependencies]
clap = "2.27.1" # crates.io에서 가져옴
rand = { git = "https://github.com/rust-lang-nursery/rand