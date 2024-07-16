## 루프에서 반환하기

`loop` 중 하나의 용도는 작업이 성공할 때까지 반복하는 것입니다. 작업이 값을 반환하는 경우,
나머지 코드로 전달해야 할 수도 있습니다. `break` 뒤에 넣으면 `loop` 표현식에 의해 반환됩니다.

```rust,editable
fn main() {
    let mut counter = 0;

    let result = loop {
        counter += 1;

        if counter == 10 {
            break counter * 2;
        }
    };

    assert_eq!(result, 20);
}
```
