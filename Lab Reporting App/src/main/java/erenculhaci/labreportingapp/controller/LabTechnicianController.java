package erenculhaci.labreportingapp.controller;
import erenculhaci.labreportingapp.dto.LabTechnicianDTO;
import erenculhaci.labreportingapp.service.*;
import lombok.*;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class LabTechnicianController {

    private final LabTechnicianService labTechnicianService;

    @PostMapping("/createLabTechnician")
    public ResponseEntity<String> createLabTechnician(@RequestBody LabTechnicianDTO labTechnicianDTO) {
        return new ResponseEntity<>(labTechnicianService.saveLabTechnician(labTechnicianDTO), HttpStatus.CREATED);
    }

    @GetMapping("/searchLabTechnicianByLabTechnicianNameSurname")
    public ResponseEntity<List<LabTechnicianDTO>> searchByLabTechnicianNameSurname(@RequestParam String labTechnicianFirstName, @RequestParam String labTechnicianLastName) {
        List <LabTechnicianDTO> labTechnicianList = labTechnicianService.searchByLabTechnicianNameSurname(labTechnicianFirstName, labTechnicianLastName);
        return new ResponseEntity<>(labTechnicianList, HttpStatus.OK);
    }

    @GetMapping("/searchLabTechnicianByLabTechnicianId")
    public ResponseEntity<List<LabTechnicianDTO>> searchByLabTechnicianId(@RequestParam Long id) {
        List <LabTechnicianDTO> labTechnicianList = labTechnicianService.searchByLabTechnicianId(id);
        return new ResponseEntity<>(labTechnicianList, HttpStatus.OK);
    }

    @GetMapping("/admin/getAllLabTechnicians")
    public ResponseEntity<List<LabTechnicianDTO>> getAllLabTechnicians() {
        List <LabTechnicianDTO> labTechnicianList = labTechnicianService.getAllLabTechnicians();
        return new ResponseEntity<>(labTechnicianList, HttpStatus.OK);
    }

    @PutMapping("/admin/updateLabTechnician")
    public ResponseEntity<String> updateLabTechnician(@RequestParam Long id, @RequestBody LabTechnicianDTO labTechnicianDTO) {
        return ResponseEntity.ok(labTechnicianService.updateLabTechnician(id, labTechnicianDTO));
    }

    @DeleteMapping("/admin/deleteLabTechnician")
    public ResponseEntity<Void> deleteLabTechnician(@RequestParam Long id) {
        labTechnicianService.deleteLabTechnician(id);
        return ResponseEntity.noContent().build();
    }
}
