import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StudentService } from '../student.service';
import { CreateStudent } from '../student.model';

@Component({
  selector: 'app-student-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './student-form.component.html',
  styleUrl: './student-form.css'
})
export class StudentFormComponent implements OnInit {
  isEdit = false;
  studentId = 0;
  loading = false;
  error = '';

  form: CreateStudent = { name: '', email: '', age: 0, course: '' };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private studentService: StudentService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.studentId = +id;
      this.studentService.getById(this.studentId).subscribe({
        next: (s) => {
          this.form = { name: s.name, email: s.email, age: s.age, course: s.course };
        },
        error: () => this.error = 'Failed to load student'
      });
    }
  }

  onSubmit() {
    this.loading = true;
    const request = this.isEdit
      ? this.studentService.update(this.studentId, this.form)
      : this.studentService.create(this.form);

    request.subscribe({
      next: () => this.router.navigate(['/students']),
      error: () => { this.error = 'Save failed. Please try again.'; this.loading = false; }
    });
  }

  onCancel() {
    this.router.navigate(['/students']);
  }
}
