## 변경 가능성

변경 가능한 데이터는 `&mut T`를 사용하여 변경 가능하게 대여받을 수 있습니다. 이를 
*변경 가능한 참조*라고 하며, 대여받는자에게 읽고 쓰는 액세스 권한을 부여합니다.
반면, `&T`는 변경 가능한 참조를 통해 데이터를 대여받으며, 
대여받는자는 데이터를 읽을 수 있지만 수정할 수 없습니다:

```rust,editable,ignore,mdbook-runnable
#[allow(dead_code)]
#[derive(Clone, Copy)]
struct Book {
    // `&'static str`은 읽기 전용 메모리에 할당된 문자열 참조입니다
    author: &'static str,
    title: &'static str,
    year: u32,
}

// 이 함수는 책 참조를 받습니다
fn borrow_book(book: &Book) {
    println!("나는 {} - {} 에디션을 변경 가능하게 대여받았습니다", book.title, book.year);
}

// 이 함수는 변경 가능한 책 참조를 받아 `year`을 2014로 변경합니다
fn new_edition(book: &mut Book) {
    book.year = 2014;
    println!("나는 {} - {} 에디션을 변경 가능하게 대여받았습니다", book.title, book.year);
}

fn main() {
    // 변경 가능하지 않은 책 `immutabook` 생성
    let immutabook = Book {
        // 문자열 리터럴은 `&'static str` 유형입니다
        author: "Douglas Hofstadter",
        title: "Gödel, Escher, Bach",
        year: 1979,
    };

    // `immutabook`의 변경 가능한 복사본을 생성하고 `mutabook`라고 합니다.
    let mut mutabook = immutabook;
    
    // 변경 가능하지 않은 객체를 변경 가능하게 대여받습니다
    borrow_book(&immutabook);

    // 변경 가능한 객체를 변경 가능하게 대여받습니다
    borrow_book(&mutabook);
    
    // 변경 가능한 객체를 변경 가능하게 대여받습니다
    new_edition(&mut mutabook);
    
    // 오류! 변경 가능하지 않은 객체를 변경 가능하게 대여받을 수 없습니다
    new_edition(&mut immutabook);
    // FIXME ^ 이 줄을 주석 처리합니다
}
```

### 참조:
[`static`][static]

[static]: ../lifetime/static_lifetime.md
