package com.example.erp.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "sales")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Sales {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String item;
    private int amount;
    private int price;
    private int total;
    private LocalDate date;
    // 총액은 계산된 값이므로 DB 칼럼으로 안 넣고, 프론트에서 처리하거나 @Transient로 처리 가능
}
