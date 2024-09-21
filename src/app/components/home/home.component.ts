import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { filter } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  message = '';

  constructor(private oauthService: OAuthService, private http: HttpClient) {}

  ngOnInit() {
    this.configureOAuth();
  }

  private configureOAuth() {
    this.oauthService.configure({
      issuer: 'http://localhost:9000',
      redirectUri: window.location.origin + '/auth',
      clientId: 'front',
      responseType: 'code',
      oidc: true,
      scope: 'openid read',
      showDebugInformation: true,
      useHttpBasicAuth: true,
      useSilentRefresh: true,
    });
    this.oauthService.loadDiscoveryDocumentAndLogin().then(() => {
      if (this.oauthService.hasValidAccessToken()) {
        console.log('Already logged in');
      } else {
        console.log('Not logged in');
      }
    });
    // Subscribe to token events
    this.oauthService.events
      .pipe(filter((e) => e.type === 'token_received'))
      .subscribe((_) => {
        console.log('Token received');
        // You can perform actions here after receiving the token
      });

    // Handle the callback
    this.oauthService.setupAutomaticSilentRefresh();
  }

  login() {
    this.oauthService.initLoginFlow();
  }

  logout() {
    this.oauthService.logOut();
  }

  getResource() {
    console.log(this.oauthService.hasValidAccessToken());
    this.http.get('http://localhost:9001/test').subscribe(
      (response) => (this.message = response.toString()),
      (error) => (this.message = 'Error: ' + error.message)
    );
  }
}
