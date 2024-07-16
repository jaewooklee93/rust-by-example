## 파일 계층 구조

모듈은 파일/디렉토리 계층 구조에 매핑될 수 있습니다. [시각화 예제][시각화]를 파일에서 살펴보겠습니다.

```shell
$ tree .
.
├── my
│   ├── inaccessible.rs
│   └── nested.rs
├── my.rs
└── split.rs
```

`split.rs` 안에서:

```rust,ignore
// 이 선언은 `my.rs`라는 파일을 찾고 `my`라는 이름의 모듈 아래에서
// 그 내용을 삽입합니다.
mod my;

fn function() {
    println!("called `function()`");
}

fn main() {
    my::function();

    function();

    my::indirect_access();

    my::nested::function();
}

```

`my.rs` 안에서:

```rust,ignore
// 마찬가지로 `mod inaccessible`과 `mod nested`는 각각 `nested.rs`와
// `inaccessible.rs` 파일을 찾고 해당 모듈 아래에 삽입합니다.
mod inaccessible;
pub mod nested;

pub fn function() {
    println!("called `my::function()`");
}

fn private_function() {
    println!("called `my::private_function()`");
}

pub fn indirect_access() {
    print!("called `my::indirect_access()`, that\n> ");

    private_function();
}
```

`my/nested.rs` 안에서:

```rust,ignore
pub fn function() {
    println!("called `my::nested::function()`");
}

#[allow(dead_code)]
fn private_function() {
    println!("called `my::nested::private_function()`");
}
```

`my/inaccessible.rs` 안에서:

```rust,ignore
#[allow(dead_code)]
pub fn public_function() {
    println!("called `my::inaccessible::public_function()`");
}
```

이전과 같이 모든 것이 제대로 작동하는지 확인해 보겠습니다.

```shell
$ rustc split.rs && ./split
called `my::function()`
called `function()`
called `my::indirect_access()`, that
> called `my::private_function()`
called `my::nested::function()`
```

[시각화]: visibility.md
