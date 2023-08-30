import { Injectable } from '@angular/core'
import { Router, UrlTree } from '@angular/router'
import { SupabaseService } from '../services/supabase.service'

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private supabase: SupabaseService, private router: Router) {}

  async canActivate(): Promise<boolean | UrlTree> {
    try {
      if (this.supabase._session?.user) {
        return true;
      } else {
        return this.router.createUrlTree(['/']);
      }
    } catch (error) {
      console.error('Error checking authentication:', error);
      return this.router.createUrlTree(['/']);
    }
  }
}
