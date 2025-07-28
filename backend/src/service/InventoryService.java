package com.example.erp.service;

import com.example.erp.dto.InventoryDto;
import com.example.erp.entity.Inventory;
import com.example.erp.exception.InventoryNotFoundException;
import com.example.erp.repository.InventoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InventoryService {

    private final InventoryRepository inventoryRepository;

    public InventoryService(InventoryRepository inventoryRepository) {
        this.inventoryRepository = inventoryRepository;
    }

    public List<Inventory> getAllInventory() {
        return inventoryRepository.findAll();
    }

    public Inventory save(Inventory item) {
        return inventoryRepository.save(item);
    }

    public Inventory update(Long id, InventoryDto dto) {
        Inventory inventory = inventoryRepository.findById(id)
                .orElseThrow(() -> new InventoryNotFoundException(id));

        inventory.setName(dto.getName());
        inventory.setQty(dto.getQty());
        inventory.setPrice(dto.getPrice());
        inventory.setDate(dto.getDate());
        return inventoryRepository.save(inventory);
    }

    public void delete(Long id) {
        if (!inventoryRepository.existsById(id)) {
            throw new InventoryNotFoundException(id);
        }
        inventoryRepository.deleteById(id);
    }

    public List<Inventory> getByDate(String date) {
        java.time.LocalDate localDate = java.time.LocalDate.parse(date);
        return inventoryRepository.findByDate(localDate);
    }


}
