## 라이브러리 사용

새로운 라이브러리에 crate를 연결하려면 `rustc`의 `--extern` 플래그를 사용할 수 있습니다. 
모든 항목은 라이브러리 이름과 동일한 모듈 아래에서 가져옵니다. 
이 모듈은 일반적으로 다른 모듈과 동일한 방식으로 작동합니다.

```rust,ignore
// extern crate rary; // Rust 2015 에디션 또는 이전 버전에 필요할 수 있습니다

fn main() {
    rary::public_function();

    // 오류! `private_function`은 private입니다
    //rary::private_function();

    rary::indirect_access();
}
```

```txt
# library.rlib가 컴파일된 라이브러리 경로이며, 여기서 동일한 디렉토리에 있다고 가정합니다.
$ rustc executable.rs --extern rary=library.rlib && ./executable 
rary의 `public_function()`이 호출되었습니다
rary의 `indirect_access()`가 호출되었습니다. 그것은
> rary의 `private_function()`을 호출했습니다
```
