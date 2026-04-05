import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Student } from '../student.model';
import { StudentService } from '../student.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './student-list.component.html'
})
export class StudentListComponent implements OnInit {
  students: Student[] = [];
  loading = true;
  error = '';

  constructor(
    private studentService: StudentService,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadStudents();
  }

  loadStudents() {
    this.loading = true;
    this.studentService.getAll().subscribe({
      next: (data) => { this.students = data; this.loading = false; },
      error: () => { this.error = 'Failed to load students'; this.loading = false; }
    });
  }

  onEdit(id: number) {
    this.router.navigate(['/students/edit', id]);
  }

  onDelete(id: number) {
    if (!confirm('Delete this student?')) return;
    this.studentService.delete(id).subscribe({
      next: () => this.loadStudents(),
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
