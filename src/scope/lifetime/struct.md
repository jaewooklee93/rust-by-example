## 구조체

구조체에서의 라이프타임 표시는 함수와 유사합니다.

```rust,editable
// `Borrowed` 타입은 `i32` 참조를 저장합니다. `i32` 참조는 `Borrowed`가 살아있는 동안 유효해야 합니다.
#[derive(Debug)]
struct Borrowed<'a>(&'a i32);

// 마찬가지로, 두 참조도 이 구조체가 살아있는 동안 유효해야 합니다.
#[derive(Debug)]
struct NamedBorrowed<'a> {
    x: &'a i32,
    y: &'a i32,
}

// `i32` 또는 `i32` 참조 중 하나를 저장하는 `enum`입니다.
#[derive(Debug)]
enum Either<'a> {
    Num(i32),
    Ref(&'a i32),
}

fn main() {
    let x = 18;
    let y = 15;

    let single = Borrowed(&x);
    let double = NamedBorrowed { x: &x, y: &y };
    let reference = Either::Ref(&x);
    let number    = Either::Num(y);

    println!("x는 {:?}에 참조됩니다")", single);
    println!("x와 y는 {:?}에 참조됩니다")", double);
    println!("x는 {:?}에 참조됩니다")", reference);
    println!("y는 {:?}에 참조되지 않습니다")", number);
}
```

### 참조:

[`구조체`][structs]


[structs]: ../../custom_types/structs.md
