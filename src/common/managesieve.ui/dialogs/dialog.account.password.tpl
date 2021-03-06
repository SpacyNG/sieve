<!-- Modal -->
<div id="sieve-password-dialog" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" data-i18n="password.dialog.title"></h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">×</span>
        </button>
      </div>
      <div class="modal-body">
        <div class="form-group row">
          <div class="col-sm-12" data-i18n="password.dialog.description"></div>
        </div>
        <div class="form-group row">
          <label class="col-sm-3 col-form-label" data-i18n="password.dialog.account"></label>
          <div class="col-sm-8 col-form-label sieve-displayname"></div>
        </div>
        <div class="form-group row">
          <label class="col-sm-3 col-form-label" data-i18n="password.dialog.username"></label>
          <div class="col-sm-8 col-form-label sieve-username"></div>
        </div>
        <div class="form-group row">
          <label class="col-sm-3 col-form-label" data-i18n="password.dialog.password"></label>
          <div class="col-sm-8">
            <input type="password" class="form-control sieve-password">
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" data-i18n="password.dialog.accept" class="btn btn-primary sieve-dialog-resolve"></button>
      </div>
    </div>
  </div>
</div>