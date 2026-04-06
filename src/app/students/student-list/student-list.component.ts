import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Student } from '../student.model';
import { StudentService } from '../student.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.css'
})
export class StudentListComponent implements OnInit {
  students: Student[] = [];
  loading = true;
  error = '';

  constructor(
    private studentService: StudentService,
    private auth: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef   // ← add this
  ) {}

  ngOnInit() {
    this.loadStudents();
  }

  loadStudents() {
    this.loading = true;
    this.error = '';
    this.studentService.getAll().subscribe({
      next: (data) => {
        this.students = data;
        this.loading = false;
        this.cdr.detectChanges();    // ← force UI update
      },
      error: () => {
        this.error = 'Failed to load students';
        this.loading = false;
        this.cdr.detectChanges();    // ← force UI update
      }
    });
  }

  onEdit(id: number) {
    this.router.navigate(['/students/edit', id]);
  }

  onDelete(id: number) {
    if (!confirm('Delete this student?')) return;
    this.studentService.delete(id).subscribe({
      next: () => {
        this.loadStudents();         // ← reloads and cdr fires inside
      },
      error: () => alert('Delete failed')
    });
  }

  onAdd() {
    this.router.navigate(['/students/add']);
  }

  onLogout() {
    this.auth.logout();
  }
}