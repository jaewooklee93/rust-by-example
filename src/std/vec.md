## 벡터

벡터는 크기가 변경 가능한 배열입니다. 슬라이스와 마찬가지로 크기는 컴파일 시 알 수 없지만, 언제든지 커지거나 줄어들 수 있습니다. 벡터는 3개의 매개변수를 사용하여 표현됩니다.
- 데이터 포인터
- 길이
- 용량

용량은 벡터에 예약된 메모리 크기를 나타냅니다. 벡터는 길이가 용량보다 작을 때까지 자랄 수 있습니다. 이 임계값을 초과해야 할 때, 벡터는 더 큰 용량으로 재할당됩니다.

```rust,editable,ignore,mdbook-runnable
fn main() {
    // 이터레이터를 벡터로 수집할 수 있습니다
    let collected_iterator: Vec<i32> = (0..10).collect();
    println!("Collected (0..10) into: {:?}", collected_iterator);

    // `vec!` 매크로를 사용하여 벡터를 초기화할 수 있습니다
    let mut xs = vec![1i32, 2, 3];
    println!("Initial vector: {:?}", xs);

    // 벡터의 끝에 새로운 요소를 삽입
    println!("Push 4 into the vector");
    xs.push(4);
    println!("Vector: {:?}", xs);

    // 오류! 변경 불가능한 벡터는 커질 수 없습니다
    collected_iterator.push(0);
    // FIXME ^ 이 줄을 주석 처리

    // `len` 메서드는 벡터에 현재 저장된 요소 수를 반환합니다
    println!("Vector length: {}", xs.len());

    // 인덱싱은 사각형 괄호를 사용하여 수행되며 (인덱싱은 0에서 시작)
    println!("Second element: {}", xs[1]);

    // `pop`은 벡터에서 마지막 요소를 제거하고 반환합니다
    println!("Pop last element: {:?}", xs.pop());

    // 범위를 벗어난 인덱싱은 panic을 발생시킵니다
    println!("Fourth element: {}", xs[3]);
    // FIXME ^ 이 줄을 주석 처리

    // `Vector`는 쉽게 반복할 수 있습니다
    println!("Contents of xs:");
    for x in xs.iter() {
        println!("> {}", x);
    }

    // `Vector`는 반복하면서 반복 횟수가 별도의 변수 (`i`)로 세어질 수도 있습니다
    for (i, x) in xs.iter().enumerate() {
        println!("In position {} we have value {}", i, x);
    }

    // `iter_mut` 덕분에 변경 가능한 `Vector`는 각 값을 수정할 수 있는 방식으로 반복할 수 있습니다
    for x in xs.iter_mut() {
        *x *= 3;
    }
    println!("Updated vector: {:?}", xs);
}
```

더 많은 `Vec` 메서드는 [std::vec][vec] 모듈에서 찾을 수 있습니다.

[vec]: https://doc.rust-lang.org/std/vec/
