import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OffersService } from '../../services/offers.service';

@Component({
  selector: 'app-vendor-page',
  templateUrl: './vendor-page.component.html',
  styleUrls: ['./vendor-page.component.css'],
  providers:[OffersService]
})

export class VendorPageComponent implements OnInit {

  lat: number;
  lng: number;
  offersList:Array<{}>=[];
  priceAfterDiscount: any;
  address:any;
  data:any;
  street:string;
  city:string;
  zip:number;
  state:string;
  vendorId:string;

  constructor(
    private offersService: OffersService,
    private route: ActivatedRoute,
    ) { }

  ngOnInit() {
    this.vendorId=this.route.snapshot.params.id;
    this.getProfile();
    this.getOfferlist();
   //this.initMap();
 }
 

 productPrice(offerOriginalPrice,offerDiscount){
   this.priceAfterDiscount = (offerOriginalPrice)*(1-(offerDiscount)/100);
 }
 getOfferlist() {
   this.offersService.getOffers(this.vendorId).subscribe((res) =>{
     debugger
     this.offersList = res;
   }, (error) =>{
   })
 }
 initMap(){
   this.offersService.getAddress(this.street,this.city,this.state,this.zip).subscribe((res) =>{
     this.address = res;
     this.lat=(this.address.results[0].geometry.location.lat);
     this.lng=(this.address.results[0].geometry.location.lng);
   }, (error) =>{
   })
 }


 getProfile() {
   this.offersService.getProfile(this.vendorId).subscribe((res) =>{
     this.data=res;
     this.street=this.data.shopAddress.street.toUpperCase();
     this.city=this.data.shopAddress.city.toUpperCase();
     this.zip=this.data.shopAddress.zipCode;
     this.state=this.data.shopAddress.state.toUpperCase();
     debugger
     this.initMap();
   },(error) =>{

   })
 }
}