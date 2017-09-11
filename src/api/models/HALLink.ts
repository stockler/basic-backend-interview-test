'use strict';

export class HALLink {
  private href: String;
  private rel: String;

  constructor(href: String, rel: String) {
    this.href = href;
    this.rel = rel;
  }
}