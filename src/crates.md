## Crate

A crate는 Rust에서 컴파일 단위입니다. `rustc some_file.rs`가 호출될 때마다,
`some_file.rs`는 *crate 파일*로 취급됩니다. `some_file.rs`에 `mod`
declarations가 있으면 모듈 파일의 내용이 crate 파일의 `mod` 선언 부분에
삽입되며, *컴파일 전*에 이루어집니다. 즉, 모듈은 개별적으로 컴파일되지 않고,
단지 crate만이 컴파일됩니다.

A crate는 바이너리 또는 라이브러리로 컴파일될 수 있습니다. 기본적으로 `rustc`는
crate에서 바이너리를 생성합니다. 이 동작은 `--crate-type` 플래그를 `lib`로 전달하여
초과할 수 있습니다.
