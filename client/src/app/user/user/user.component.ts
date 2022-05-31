import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  user: any;
  history: any;
  constructor(private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit(): void {
    this.user = this.route.snapshot.paramMap.get('email');
    this.userService.getHistory(this.user).subscribe(data => {
      this.history = data;
    })
  }

}
