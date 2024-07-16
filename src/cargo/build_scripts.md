## 빌드 스크립트

때때로 `cargo`로부터의 일반적인 빌드만으로는 충분하지 않습니다. 아마도 빌드가 성공적으로 컴파일되기 전에 `cargo`가 필요로 하는 사전 요구 사항이 있을 수 있습니다. 코드 생성이나 컴파일해야 하는 네이티브 코드와 같은 것들입니다. 이 문제를 해결하기 위해 Cargo는 빌드 스크립트를 사용할 수 있습니다.

패키지에 빌드 스크립트를 추가하려면 다음과 같이 `Cargo.toml`에 지정할 수 있습니다.

```toml
[package]
...
build = "build.rs"
```

그렇지 않으면 Cargo는 프로젝트 디렉토리에서 기본적으로 `build.rs` 파일을 찾습니다.

## 빌드 스크립트 사용 방법

빌드 스크립트는 패키지의 다른 모든 것을 컴파일하기 전에 컴파일되고 호출되는 또 다른 Rust 파일입니다. 따라서 패키지의 사전 요구 사항을 충족하는 데 사용할 수 있습니다.

Cargo는 환경 변수를 통해 스크립트에 입력을 제공합니다. [여기서 지정됨]

스크립트는 stdout를 통해 출력을 제공합니다. 출력된 모든 줄은 `target/debug/build/<pkg>/output`로 작성됩니다. 또한 `cargo:`로 시작하는 줄은 Cargo에서 직접 해석되므로 패키지의 컴파일을 위한 매개변수를 정의하는 데 사용할 수 있습니다.

더 자세한 내용과 예제는 [Cargo 명세서][cargo_specification]를 참조하십시오.

[여기서 지정됨]: https://doc.rust-lang.org/cargo/reference/environment-variables.html#environment-variables-cargo-sets-for-build-scripts

[cargo_specification]: https://doc.rust-lang.org/cargo/reference/build-scripts.html
