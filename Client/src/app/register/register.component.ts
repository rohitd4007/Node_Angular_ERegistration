import { RegisterServiceService } from "./../register-service.service";
import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from "@angular/forms";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
  regForm: FormGroup;
  reg1 = "Corporate";
  regType: any = ["Self", "Group", "Corporate", "Others"];
  isSubmit: boolean = false;
  showPreview: any = false;
  imgUrl: any;
  images;
  public imagePath;
  imgURL: any;
  public message: string;
  uid: any;
  showForm = false;

  constructor(
    private formBuilder: FormBuilder,
    private regservice: RegisterServiceService
  ) {}

  preview(files) {
    if (files.length > 0) {
      const file = files[0];
      this.images = file;
    }
    if (files.length === 0) return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }

    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    };
  }

  getData() {
    this.regservice.getUser().subscribe(
      (data) => {
        console.log(data.data.user[0].photo);
        this.imgUrl = data.data.user[0].photo;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  submit() {
    this.showForm = true;
    this.showPreview = true;
  }

  addData() {
    this.isSubmit = true;
    this.showPreview = false;

    const formdata = new FormData();
    formdata.append("name", this.regForm.value.firstName);
    formdata.append("mobile", this.regForm.value.mobile);
    formdata.append("email", this.regForm.value.email);
    formdata.append("regType", this.regForm.value.regType);
    formdata.append("photo", this.images);
    formdata.append("noOfTicket", this.regForm.value.noOfTicket);

    this.regservice.createUser(formdata).subscribe(
      (msg) => {
        console.log("success", msg.data.user.userId);
        this.uid = msg.data.user.userId;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  ngOnInit(): void {
    this.regForm = this.formBuilder.group({
      firstName: ["", Validators.required],
      mobile: ["", Validators.required],
      email: ["", Validators.required],
      uFile: ["", Validators.required],
      regType: ["", Validators.required],
      noOfTicket: ["", Validators.required],
    });
  }
}
