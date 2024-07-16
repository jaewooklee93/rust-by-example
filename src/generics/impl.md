## 구현

함수와 마찬가지로, 구현 또한 일반화된 상태로 유지해야 합니다.

```rust
struct S; // 구체적인 유형 `S`
struct GenericVal<T>(T); // 일반적인 유형 `GenericVal`

// `GenericVal`의 구현 (여기서 유형 매개변수를 명시적으로 지정)
impl GenericVal<f32> {} // `f32` 지정
impl GenericVal<S> {} // 위에서 정의된 `S` 지정

// `<T>`는 일반적인 유형을 유지하려면 유형 앞에 있어야 합니다
impl<T> GenericVal<T> {}
```

```rust,editable
struct Val {
    val: f64,
}

struct GenVal<T> {
    gen_val: T,
}

// `Val`의 구현
impl Val {
    fn value(&self) -> &f64 {
        &self.val
    }
}

// 일반적인 유형 `T`에 대한 `GenVal`의 구현
impl<T> GenVal<T> {
    fn value(&self) -> &T {
        &self.gen_val
    }
}

fn main() {
    let x = Val { val: 3.0 };
    let y = GenVal { gen_val: 3i32 };

    println!("{}, {}", x.value(), y.value());
}
```

### 참조:

[함수 반환 참조][fn], [`impl`][methods], [`struct`][structs]


[fn]: ../scope/lifetime/fn.md
[methods]: ../fn/methods.md
[specialization_plans]: https://blog.rust-lang.org/2015/05/11/traits.html#the-future
[structs]: ../custom_types/structs.md
