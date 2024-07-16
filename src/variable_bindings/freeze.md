## 얼리징

데이터가 동일한 이름으로 불변적으로 바인딩될 때, 그 데이터는 *얼리징*됩니다. *얼리징*된 데이터는 불변적인 바인딩이 범위를 벗어나기 전까지 수정할 수 없습니다.

```rust,editable,ignore,mdbook-runnable
fn main() {
    let mut _mutable_integer = 7i32;

    {
        // 불변적인 `_mutable_integer`에 의한 그림자 생성
        let _mutable_integer = _mutable_integer;

        // 오류! `_mutable_integer`는 이 범위에서 얼리징됩니다
        _mutable_integer = 50;
        // FIXME ^ 이 줄을 주석 처리하세요

        // `_mutable_integer`는 범위를 벗어납니다
    }

    // 괜찮습니다! `_mutable_integer`는 이 범위에서 얼리징되지 않습니다
    _mutable_integer = 3;
}
```
