## 메서드

메서드는 함수와 유사하게 나타냅니다.

```rust,editable
struct Owner(i32);

impl Owner {
    // 라이프타임을 함수와 같이 나타냅니다.
    fn add_one<'a>(&'a mut self) { self.0 += 1; }
    fn print<'a>(&'a self) {
        println!("`print`: {}", self.0);
    }
}

fn main() {
    let mut owner = Owner(18);

    owner.add_one();
    owner.print();
}
```

### 참조:

[메서드]

[메서드]: ../../fn/methods.md
