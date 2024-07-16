## 반복자

[`Iterator`][iter] 트레이트는 배열과 같은 자료구조에 대한 반복자를 구현하는 데 사용됩니다.

이 트레이트는 `next` 요소를 위한 메서드를 정의하는 것만 요구합니다. 이 메서드는 `impl` 블록에서 수동으로 정의하거나 배열 및 범위와 같이 자동으로 정의할 수 있습니다.

일반적인 상황에 대한 편의를 위해 `for` 구문은 [`.into_iter()`][intoiter] 메서드를 사용하여 일부 자료구조를 반복자로 변환합니다.

```rust,editable
struct Fibonacci {
    curr: u32,
    next: u32,
}

// `Fibonacci`에 대해 `Iterator`를 구현합니다.
// `Iterator` 트레이트는 `next` 요소를 위한 메서드만 정의해야 합니다.
impl Iterator for Fibonacci {
    // 이 유형은 `Self::Item`을 사용하여 참조할 수 있습니다.
    type Item = u32;

    // `curr`와 `next`를 사용하여 순서를 정의합니다.
    // 반환 유형은 `Option<T>`입니다:
    //     * 반복자가 끝나면 `None`이 반환됩니다.
    //     * 그렇지 않으면 다음 값이 `Some`에 싸여 반환됩니다.
    // `Self::Item`을 반환 유형에 사용하여 유형을 변경할 때 함수 서명을 업데이트할 필요가 없습니다.
    fn next(&mut self) -> Option<Self::Item> {
        let current = self.curr;

        self.curr = self.next;
        self.next = current + self.next;

        // 피보나치 수열에는 끝이 없으므로 반복자는 `None`을 반환하지 않고 항상 `Some`이 반환됩니다.
        Some(current)
    }
}

// 피보나치 수열 생성기를 반환합니다.
fn fibonacci() -> Fibonacci {
    Fibonacci { curr: 0, next: 1 }
}

fn main() {
    // `0..3`은 0, 1, 2를 생성하는 반복자입니다.
    let mut sequence = 0..3;

    println!("0..3에 대한 네 번의 연속적인 `next` 호출");
    println!("> {:?}", sequence.next());
    println!("> {:?}", sequence.next());
    println!("> {:?}", sequence.next());
    println!("> {:?}", sequence.next());

    // `for`는 `None`을 반환할 때까지 반복자를 거칩니다.
    // 각 `Some` 값이 풀려서 변수(여기서는 `i`)에 바인딩됩니다.
    println!("0..3를 `for`를 사용하여 반복");
    for i in 0..3 {
        println!("> {}", i);
    }

    // `take(n)` 메서드는 반복자를 처음 `n` 개의 항으로 줄입니다.
    println!("피보나치 수열의 첫 네 항은: ");
    for i in fibonacci().take(4) {
        println!("> {}", i);
    }

    // `skip(n)` 메서드는 반복자에서 처음 `n` 개의 항을 건너뛰어 짧게 만듭니다.
    println!("피보나치 수열의 다음 네 항은: ");
    for i in fibonacci().skip(4).take(4) {
        println!("> {}", i);
    }

    let array = [1u32, 3, 3, 7];

    // `iter` 메서드는 배열/슬라이스에 대한 반복자를 생성합니다.
    println!("다음 배열을 반복: {:?}", &array);
    for i in array.iter() {
        println!("> {}", i);
    }
}
```

[intoiter]: https://doc.rust-lang.org/std/iter/trait.IntoIterator.html
[iter]: https://doc.rust-lang.org/core/iter/trait.Iterator.html
