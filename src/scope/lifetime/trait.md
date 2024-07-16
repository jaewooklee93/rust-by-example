## Trait

Trait 메서드에서의 라이프타임 표시는 기본적으로 함수와 유사합니다.
`impl` 또한 라이프타임을 나타낼 수 있습니다.

```rust,editable
// 라이프타임을 나타낸 구조체
#[derive(Debug)]
struct Borrowed<'a> {
    x: &'a i32,
}

// impl에 라이프타임을 나타냄
impl<'a> Default for Borrowed<'a> {
    fn default() -> Self {
        Self {
            x: &10,
        }
    }
}

fn main() {
    let b: Borrowed = Default::default();
    println!("b is {:?}", b);
}
```

### 참조:

[`trait`s][trait]


[trait]: ../../trait.md
