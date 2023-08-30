import { Component, OnInit, Input } from '@angular/core'
import { AuthSession } from '@supabase/supabase-js'
import { Profile, SupabaseService } from '../../services/supabase.service'
import { FormBuilder } from '@angular/forms'

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  loading = false
  profile!: Profile
  @Input()
  session!: AuthSession
  constructor(private readonly supabase: SupabaseService, private formBuilder: FormBuilder) {}
  async ngOnInit(): Promise<void> {
    await this.getProfile()
  }
  async getProfile() {
    try {
      this.loading = true
      const { user } = this.session
      let { data: profile, error, status } = await this.supabase.profile(user)

      if (error && status !== 406) {
        throw error
      }

      if (profile) {
        this.profile = profile
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message)
      }
    } finally {
      this.loading = false
    }
  }
}
