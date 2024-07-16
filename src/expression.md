## 표현식

Rust 프로그램은 (주로) 다음과 같은 명령문의 일련으로 구성됩니다.

```rust,editable
fn main() {
    // 명령문
    // 명령문
    // 명령문
}
```

Rust에는 몇 가지 유형의 명령문이 있습니다. 가장 일반적인 두 가지는 변수 바인딩을 선언하고 `;`와 함께 표현식을 사용하는 것입니다.

```rust,editable
fn main() {
    // 변수 바인딩
    let x = 5;

    // 표현식;
    x;
    x + 1;
    15;
}
```

블록 또한 표현식이므로 할당에 값으로 사용될 수 있습니다. 블록의 마지막 표현식이 할당되는 위치 표현식(예: 지역 변수)에 할당됩니다. 그러나 블록의 마지막 표현식이 세미콜론으로 끝나면 반환 값이 `()`이 됩니다.

```rust,editable
fn main() {
    let x = 5u32;

    let y = {
        let x_squared = x * x;
        let x_cube = x_squared * x;

        // 이 표현식이 `y`에 할당됩니다
        x_cube + x_squared + x
    };

    let z = {
        // 세미콜론이 표현식을 무시하고 `()`가 `z`에 할당됩니다
        2 * x;
    };

    println!("x is {:?}", x);
    println!("y is {:?}", y);
    println!("z is {:?}", z);
}
```
